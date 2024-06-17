export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'All-Cohol!',
  description: '저렴하고 맛있는 술을 찾아서...',
  mainNav: [
    {
      title: '랭킹',
      href: '/rank',
    },
    {
      title: '알성비 측정',
      href: '/measure',
    },
  ],
  links: {
    twitter: 'https://twitter.com/shadcn',
    github: 'https://github.com/shadcn/ui',
    docs: 'https://ui.shadcn.com',
  },
};
