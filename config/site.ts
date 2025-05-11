export type SiteConfig = typeof siteConfig;

const vercelHost = process.env.VERCEL_URL || 'localhost:3000';
const baseUrl = new URL(
  `http${vercelHost.includes('localhost') ? '' : 's'}://${vercelHost}`
);

export const siteConfig = {
  name: 'Next Chat App',
  description: 'Make beautiful websites regardless of your design experience.',
  navItems: [],
  navMenuItems: [
    {
      label: 'My Page',
      href: '/mypage',
    },
    {
      label: 'Chatroom',
      href: '/chatroom',
    },
    {
      label: 'Logout',
      href: '/logout',
    },
  ],
  url: baseUrl,
  links: {
    github: 'https://github.com/nextui-org/nextui',
    twitter: 'https://twitter.com/getnextui',
    docs: 'https://nextui.org',
    discord: 'https://discord.gg/9b6yyZKmH4',
    sponsor: 'https://patreon.com/jrgarciadev',
  },
};
