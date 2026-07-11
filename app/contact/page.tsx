import type { Metadata } from 'next';
import { PageHeader, Section, Badge, PlaceholderNote } from '@/components/ui';
import { principalInvestigator, team, site } from '@/data/site';
import { ContactForm } from '@/components/ContactForm';
import { IconUsers, IconTarget, IconClock, IconGlobe } from '@/components/icons';

const piCredentials = ['MBBS', 'MD (Community Medicine)', 'PhD', 'MBA (Healthcare Management)', 'Dean (Student’s Welfare)', 'International FAIMER Fellow'];

const groupIcon: Record<string, React.ReactNode> = {
  'Co-Investigators': <IconTarget width={18} height={18} className="text-brand-600" />,
  'External Experts / Reviewers': <IconUsers width={18} height={18} className="text-brand-600" />,
  'FAIMER Mentors / Advisors': <IconGlobe width={18} height={18} className="text-brand-600" />,
  'Technical Collaborators': <IconClock width={18} height={18} className="text-brand-600" />,
  'Student & Faculty Contributors': <IconUsers width={18} height={18} className="text-brand-600" />,
};

export const metadata: Metadata = {
  title: 'Contact & Team',
  description:
    'Meet the CaseStep project team led by Dr. D. Sunil Kumar, and get in touch about the FAIMER project on digital case-based learning in Community Medicine.',
  alternates: { canonical: '/contact/' },
  openGraph: { url: '/contact/' },
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
              <Badge tone="brand">Founder &amp; Academic Lead, CaseStep</Badge>
              <h2 className="mt-2 text-2xl font-bold text-ink-900">{principalInvestigator.name}</h2>
              <p className="mt-2 leading-relaxed text-ink-600">
                Professor of Community Medicine, JSS Medical College · Dean (Students’ Welfare),
                JSS AHER, Mysuru.
              </p>
              <p className="mt-2 text-sm font-medium text-ink-700">
                For collaboration, faculty adoption, research partnerships, or feedback, use the
                form below.
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {piCredentials.map((c) => (
                  <Badge key={c}>{c}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Team groups */}
      <Section title="Project team" description="Roles are structured in advance of formal appointment; names are added once confirmed through the appropriate institutional or consent process.">
        <div className="grid gap-6 md:grid-cols-2">
          {team.map((group) => (
            <div key={group.group} className="card p-6">
              <h3 className="flex items-center gap-2 font-bold text-ink-900">
                {groupIcon[group.group] ?? <IconUsers width={18} height={18} className="text-brand-600" />} {group.group}
              </h3>
              <ul className="mt-4 space-y-3">
                {group.members.map((m) => (
                  <li key={m.name}>
                    {m.placeholder ? (
                      <div className="flex items-center gap-3 rounded-xl border border-dashed border-ink-300 bg-ink-50 p-3">
                        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white text-ink-400 ring-1 ring-ink-200">
                          <IconClock width={18} height={18} />
                        </span>
                        <div>
                          <p className="font-medium text-ink-700">{m.name}</p>
                          <p className="text-xs italic text-ink-500">{group.placeholderNote}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700">
                          {m.name
                            .split(' ')
                            .map((w) => w[0])
                            .slice(0, 2)
                            .join('')}
                        </span>
                        <div>
                          <p className="font-medium text-ink-800">{m.name}</p>
                          <p className="text-xs text-ink-500">{m.role}</p>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <PlaceholderNote>
          <span className="font-semibold text-ink-700">Consent &amp; institutional approval note: </span>
          No collaborator, mentor, or contributor name is published on this platform without their
          explicit consent and the appropriate institutional approval. Every placeholder above will
          be replaced with a named, credited entry only once that process is complete.
        </PlaceholderNote>
      </Section>

      {/* Collaboration invitation */}
      <Section title="Collaborate with us" className="border-t border-ink-200">
        <div className="card bg-gradient-to-br from-brand-50 to-indigo-50 p-6">
          <h3 className="flex items-center gap-2 font-bold text-ink-900">
            <IconGlobe width={18} height={18} className="text-brand-600" /> Open to collaboration
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-700">
            {site.name} welcomes collaboration from Community Medicine faculty, medical educators,
            FAIMER fellows and mentors, clinical-reasoning and assessment experts, and educational
            technologists — whether to review case content, contribute to the expert (Delphi) panel,
            co-author scholarly outputs, or pilot the platform at another institution. Please reach
            out via the enquiry form below.
          </p>
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
              For collaboration, review, or research enquiries about {site.name}, please contact
              Dr. Kumar through the Department of Community Medicine, {site.institution}, or use
              the form below.
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

          {/* Contact form (client component; submits directly to Web3Forms) */}
          <ContactForm />
        </div>
      </Section>
    </>
  );
}
