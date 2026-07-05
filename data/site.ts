/** Central site metadata, navigation, and team content. */

export const site = {
  name: 'CaseStep',
  tagline: 'Digital Case-Based Learning for Clinical Reasoning in Community Medicine',
  projectTitle:
    'Integrating Digital Case-Based Learning to Enhance Clinical Reasoning in Community Medicine',
  institution: 'JSS Academy of Higher Education & Research, Mysuru',
  program: 'International FAIMER Fellowship Project',
};

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/cases', label: 'Case Library' },
  { href: '/sct', label: 'SCT' },
  { href: '/osce', label: 'OSCE / OSPE' },
  { href: '/dashboard/student', label: 'Student' },
  { href: '/dashboard/faculty', label: 'Faculty' },
  { href: '/expert-review', label: 'Expert Review' },
  { href: '/research', label: 'Research' },
  { href: '/contact', label: 'Contact' },
];

export interface TeamMember {
  name: string;
  role: string;
  detail?: string;
  affiliation?: string;
  placeholder?: boolean;
}

export const principalInvestigator: TeamMember = {
  name: 'Dr. D. Sunil Kumar',
  role: 'Principal Investigator',
  detail:
    'MBBS, MD (Community Medicine), PhD, MBA (Healthcare Management). Dean (Student’s Welfare) · Professor of Community Medicine · International FAIMER Fellow.',
  affiliation: 'JSS Academy of Higher Education & Research, Mysuru',
};

export const team: { group: string; members: TeamMember[] }[] = [
  {
    group: 'Co-Investigators',
    members: [
      { name: 'Co-Investigator (Community Medicine)', role: 'Co-Investigator', placeholder: true },
      { name: 'Co-Investigator (Medical Education)', role: 'Co-Investigator', placeholder: true },
    ],
  },
  {
    group: 'External Experts / Reviewers',
    members: [
      { name: 'Subject Expert — Community Medicine', role: 'External Expert', placeholder: true },
      { name: 'Assessment / Clinical Reasoning Expert', role: 'External Expert', placeholder: true },
    ],
  },
  {
    group: 'FAIMER Mentors / Advisors',
    members: [
      { name: 'FAIMER Faculty Mentor', role: 'Mentor / Advisor', placeholder: true },
      { name: 'FAIMER Project Advisor', role: 'Mentor / Advisor', placeholder: true },
    ],
  },
  {
    group: 'Technical Collaborators',
    members: [
      { name: 'Educational Technologist', role: 'Technical Collaborator', placeholder: true },
      { name: 'Data / Analytics Support', role: 'Technical Collaborator', placeholder: true },
    ],
  },
];
