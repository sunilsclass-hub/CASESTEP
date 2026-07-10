'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import type { User } from '@supabase/supabase-js';
import { getSupabase, isSupabaseConfigured } from './supabase';
import { setSyncHandler, hydrateStore, readStore, type Store } from './storage';
import { reconcileOnLogin, pushCloudStore } from './sync';

interface AuthState {
  /** Whether a Supabase backend is configured for this deployment. */
  enabled: boolean;
  loading: boolean;
  user: User | null;
  syncing: boolean;
  /**
   * True the moment Supabase reports a PASSWORD_RECOVERY session — i.e. the
   * user arrived via an emailed "reset your password" link, no matter which
   * page they land on. The UI must block normal use of the app and force a
   * "set new password" step while this is true; see PasswordRecoveryModal.
   */
  passwordRecovery: boolean;
  signUp: (email: string, password: string) => Promise<{ error?: string; needsConfirm?: boolean }>;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error?: string }>;
  updatePassword: (newPassword: string) => Promise<{ error?: string }>;
  /** Call after the user has successfully set a new password to end recovery mode and proceed as signed in. */
  completePasswordRecovery: () => void;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [passwordRecovery, setPasswordRecovery] = useState(false);
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Mirrors `passwordRecovery` for use inside the onAuthStateChange closure
  // below (registered once; a ref avoids stale-state reads across the
  // PASSWORD_RECOVERY -> INITIAL_SESSION event pair Supabase fires in
  // quick succession for the same recovery session).
  const recoveryRef = useRef(false);

  // Register a debounced cloud-push handler while a user is signed in.
  const attachSync = useCallback((userId: string) => {
    setSyncHandler((store: Store) => {
      if (debounce.current) clearTimeout(debounce.current);
      debounce.current = setTimeout(() => {
        setSyncing(true);
        pushCloudStore(userId, store).finally(() => setSyncing(false));
      }, 800);
    });
  }, []);

  const onLogin = useCallback(
    async (u: User) => {
      setUser(u);
      setSyncing(true);
      try {
        const merged = await reconcileOnLogin(u.id);
        hydrateStore(merged);
      } finally {
        setSyncing(false);
      }
      attachSync(u.id);
    },
    [attachSync],
  );

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) {
      setLoading(false);
      return;
    }
    let mounted = true;

    // Belt-and-braces: if the Supabase project is paused/unreachable and the
    // network request never settles, this ensures `loading` still resolves
    // so nothing in the UI can wait on it forever.
    const safety = setTimeout(() => {
      if (mounted) setLoading(false);
    }, 4000);

    // Resolve `loading` once the client has checked for a session, but do
    // NOT trigger login side-effects here. onAuthStateChange (below) fires
    // once immediately on subscribe with the current session AND correctly
    // distinguishes a PASSWORD_RECOVERY session from a normal one — calling
    // onLogin() from both places raced each other, and getSession() always
    // won (it has no way to know a session came from a recovery link), which
    // is what silently signed recovery-link users straight into the app.
    supabase.auth
      .getSession()
      .then(() => {
        if (mounted) setLoading(false);
      })
      .catch(() => {
        // Network/config error reaching Supabase — fail open to the
        // signed-out, local-only experience rather than hanging.
        if (mounted) setLoading(false);
      })
      .finally(() => clearTimeout(safety));

    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        // A recovery session is NOT a normal login: hold the user here (so
        // updateUser() has a session to act on) but do not reconcile/sync
        // stores or let the rest of the app treat this as "signed in" until
        // the password has actually been changed — see PasswordRecoveryModal.
        recoveryRef.current = true;
        setUser(session?.user ?? null);
        setPasswordRecovery(true);
        return;
      }
      if (recoveryRef.current && session?.user) {
        // While the recovery gate is open, Supabase fires several other
        // benign events for the SAME session — INITIAL_SESSION right after
        // PASSWORD_RECOVERY on load, USER_UPDATED once updateUser() succeeds,
        // occasional TOKEN_REFRESHED — none of these should silently close
        // the gate. Only completePasswordRecovery() (the "Continue" button)
        // or a session-less event (e.g. SIGNED_OUT) may end recovery mode.
        return;
      }
      recoveryRef.current = false;
      setPasswordRecovery(false);
      if (session?.user) {
        onLogin(session.user);
      } else {
        setUser(null);
        setSyncHandler(null);
      }
    });

    return () => {
      mounted = false;
      clearTimeout(safety);
      sub.subscription.unsubscribe();
    };
  }, [onLogin]);

  const signUp = useCallback(async (email: string, password: string) => {
    const supabase = getSupabase();
    if (!supabase) return { error: 'Backend not configured.' };
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return { error: error.message };
    // If email confirmation is enabled, there is no session yet.
    return { needsConfirm: !data.session };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const supabase = getSupabase();
    if (!supabase) return { error: 'Backend not configured.' };
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    return {};
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    const supabase = getSupabase();
    if (!supabase) return { error: 'Backend not configured.' };
    const redirectTo =
      typeof window !== 'undefined' ? `${window.location.origin}/reset-password/` : undefined;
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
    if (error) return { error: error.message };
    return {};
  }, []);

  const updatePassword = useCallback(async (newPassword: string) => {
    const supabase = getSupabase();
    if (!supabase) return { error: 'Backend not configured.' };
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) return { error: error.message };
    return {};
  }, []);

  const completePasswordRecovery = useCallback(() => {
    recoveryRef.current = false;
    setPasswordRecovery(false);
    if (user) onLogin(user);
  }, [user, onLogin]);

  const signOut = useCallback(async () => {
    const supabase = getSupabase();
    setSyncHandler(null);
    // Push any final local state before signing out (skipped mid-recovery,
    // since there is nothing meaningful to sync yet and it is not a real login).
    if (supabase && user && !passwordRecovery) await pushCloudStore(user.id, readStore());
    await supabase?.auth.signOut();
    setUser(null);
    recoveryRef.current = false;
    setPasswordRecovery(false);
  }, [user, passwordRecovery]);

  return (
    <AuthContext.Provider
      value={{
        enabled: isSupabaseConfigured,
        loading,
        user,
        syncing,
        passwordRecovery,
        signUp,
        signIn,
        signOut,
        resetPassword,
        updatePassword,
        completePasswordRecovery,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    // Safe fallback so components work even if the provider is absent.
    return {
      enabled: false,
      loading: false,
      user: null,
      syncing: false,
      passwordRecovery: false,
      signUp: async () => ({ error: 'Auth unavailable' }),
      signIn: async () => ({ error: 'Auth unavailable' }),
      signOut: async () => {},
      resetPassword: async () => ({ error: 'Auth unavailable' }),
      updatePassword: async () => ({ error: 'Auth unavailable' }),
      completePasswordRecovery: () => {},
    };
  }
  return ctx;
}
