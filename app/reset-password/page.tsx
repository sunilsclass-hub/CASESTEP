import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui';
import { ResetPasswordForm } from '@/components/ResetPasswordForm';

export const metadata: Metadata = {
  title: 'Reset Password',
  description: 'Set a new password for your CaseStep account.',
  alternates: { canonical: '/reset-password/' },
  openGraph: { url: '/reset-password/' },
  robots: { index: false, follow: false },
};

export default function ResetPasswordPage() {
  return (
    <>
      <PageHeader eyebrow="Account" title="Reset your password" />
      <div className="container-page py-10">
        <ResetPasswordForm />
      </div>
    </>
  );
}
