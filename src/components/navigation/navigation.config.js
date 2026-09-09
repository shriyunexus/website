/**
 * Shriyu Nexus Solutions — Navigation & Site Configuration
 */

export const siteConfig = {
  name: 'Shriyu Nexus Solutions',
  email: 'shriyunexus@gmail.com',
  phone: '+91 8160156799',
  headquarters: 'F/101 Mahamangaliya residency, Tavra road, Zadeshwar cross road, Bharuch - 392011 (Headquarter)',
  officeAhmedabad: 'Prabhat Chowk, Ghatlodiya, Ahmedabad - 380061',
  tagline: 'Built on intent. Scaled with discipline.',
};

export const navigationConfig = [
  {
    id: 'solutions',
    label: 'Solutions',
    href: '#capabilities',
  },
  {
    id: 'services',
    label: 'Services',
    href: '/services',
  },
  {
    id: 'how-we-start',
    label: 'How To Start',
    href: '#how-to-start',
  },
  {
    id: 'about',
    label: 'About us',
    href: '/about',
  },
];

export const isActive = (item, currentPage) =>
  (item.id === 'about'    && currentPage === 'about')    ||
  (item.id === 'contact'  && currentPage === 'contact')  ||
  (item.id === 'services' && currentPage === 'services');

export const primaryCTA = {
  label: 'Contact',
  href: '/contact',
};
