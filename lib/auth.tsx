'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { getSupabase, isSupabaseConfigured } from './supabase';
import { setSyncHandler, hydrateStore, readStore, type Store } from './storage';
import { reconcileOnLogin, pushCloudStore } from './sync';

interface AuthState {
  /** Whether a Supabase backend is configured for this deployment. */
  enabled: boolean;
  loading: boolean;
  user: User | null;
  syncing: boolean;
  signUp: (email: string, password: string) => Promise<{ error?: string; needsConfirm?: boolean }>;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null);

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

    supabase.auth.getSession().then(({ data }: { data: { session: Session | null } }) => {
      if (!mounted) return;
      if (data.session?.user) {
        onLogin(data.session.user);
      }
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        onLogin(session.user);
      } else {
        setUser(null);
        setSyncHandler(null);
      }
    });

    return () => {
      mounted = false;
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

  const signOut = useCallback(async () => {
    const supabase = getSupabase();
    setSyncHandler(null);
    // Push any final local state before signing out.
    if (supabase && user) await pushCloudStore(user.id, readStore());
    await supabase?.auth.signOut();
    setUser(null);
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ enabled: isSupabaseConfigured, loading, user, syncing, signUp, signIn, signOut }}
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
      signUp: async () => ({ error: 'Auth unavailable' }),
      signIn: async () => ({ error: 'Auth unavailable' }),
      signOut: async () => {},
    };
  }
  return ctx;
}
