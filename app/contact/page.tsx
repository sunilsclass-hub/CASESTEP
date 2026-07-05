import type { Metadata } from 'next';
import { PageHeader, Section, Badge } from '@/components/ui';
import { principalInvestigator, team, site } from '@/data/site';
import { ContactForm } from '@/components/ContactForm';
import { IconUsers, IconTarget } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Contact & Team',
  description:
    'Meet the CaseStep project team led by Dr. D. Sunil Kumar, and get in touch about the FAIMER project on digital case-based learning in Community Medicine.',
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact & Team"
        title="The people behind CaseStep"
        description="A collaborative FAIMER project bringing together Community Medicine faculty, medical educators, external experts, and technical collaborators."
      />

      {/* Principal investigator */}
      <Section>
        <div className="card overflow-hidden">
          <div className="grid gap-6 p-6 sm:grid-cols-[auto,1fr] sm:p-8">
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-brand-600 text-3xl font-bold text-white">
              SK
            </div>
            <div>
              <Badge tone="brand">{principalInvestigator.role}</Badge>
              <h2 className="mt-2 text-2xl font-bold text-ink-900">{principalInvestigator.name}</h2>
              <p className="mt-2 leading-relaxed text-ink-600">{principalInvestigator.detail}</p>
              <p className="mt-2 text-sm font-medium text-ink-700">
                {principalInvestigator.affiliation}
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Team groups */}
      <Section title="Project team">
        <div className="grid gap-6 md:grid-cols-2">
          {team.map((group) => (
            <div key={group.group} className="card p-6">
              <h3 className="flex items-center gap-2 font-bold text-ink-900">
                <IconUsers width={18} height={18} className="text-brand-600" /> {group.group}
              </h3>
              <ul className="mt-4 space-y-3">
                {group.members.map((m) => (
                  <li key={m.name} className="flex items-center gap-3">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-ink-100 text-sm font-semibold text-ink-400">
                      ?
                    </span>
                    <div>
                      <p className="font-medium text-ink-800">{m.name}</p>
                      <p className="text-xs text-ink-500">
                        {m.role}
                        {m.placeholder && ' · to be added'}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Contact block */}
      <Section title="Get in touch" className="border-t border-ink-200">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="card p-6">
            <h3 className="flex items-center gap-2 font-bold">
              <IconTarget width={18} height={18} className="text-brand-600" /> Enquiries
            </h3>
            <p className="mt-2 text-sm text-ink-600">
              For collaboration, review, or research enquiries about {site.name}, please contact the
              principal investigator through the Department of Community Medicine,{' '}
              {site.institution}.
            </p>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex gap-2">
                <dt className="w-24 font-medium text-ink-500">Project</dt>
                <dd className="text-ink-700">{site.projectTitle}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-24 font-medium text-ink-500">Programme</dt>
                <dd className="text-ink-700">{site.program}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-24 font-medium text-ink-500">Institution</dt>
                <dd className="text-ink-700">{site.institution}</dd>
              </div>
            </dl>
          </div>

          {/* Contact form (client component; placeholder backend) */}
          <ContactForm />
        </div>
      </Section>
    </>
  );
}
