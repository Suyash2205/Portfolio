/**
 * Sections as "planets" in the space research center layout.
 * id, label, short description (on planet), accent color for planet styling.
 */
export const SECTIONS = [
  {
    id: 'about',
    label: 'About',
    description: 'Background, education focus, and what drives me.',
    color: '#00d4ff',
  },
  {
    id: 'experience',
    label: 'Experience',
    description: 'Roles, companies, and key contributions.',
    color: '#a855f7',
  },
  {
    id: 'education',
    label: 'Education',
    description: 'Degrees, institutions, and academic track.',
    color: '#22c55e',
  },
  {
    id: 'projects',
    label: 'Projects',
    description: 'Built projects from ML to web and IoT.',
    color: '#f59e0b',
  },
  {
    id: 'skills',
    label: 'Skills',
    description: 'Languages, tools, and soft skills.',
    color: '#ec4899',
  },
  {
    id: 'contact',
    label: 'Contact',
    description: 'Get in touch — email, phone, LinkedIn, GitHub.',
    color: '#06b6d4',
  },
];

export const SLIDE_ORDER = ['center', ...SECTIONS.map((s) => s.id)];
