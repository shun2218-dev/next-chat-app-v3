export type SiteConfig = typeof siteConfig;

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
  links: {
    github: 'https://github.com/nextui-org/nextui',
    twitter: 'https://twitter.com/getnextui',
    docs: 'https://nextui.org',
    discord: 'https://discord.gg/9b6yyZKmH4',
    sponsor: 'https://patreon.com/jrgarciadev',
  },
};
