export const SITE = {
  domain: "https://systic.vercel.app",
  baseUrl: "/",

  title: "Systic — Astro Theme",
  description: "🚀 Systic is an Astro theme to create a curated list page.",

  googleAnalyticsId: false, // or "G-XXXXXXXXXX",
  googleSiteVerificationId: "",

  contentSlug: "item",

  // Social page URL's
  social: {
    github: 'https://github.com',
    twitter: 'https://twitter.com',
    facebook: '',
    instagram: '',
  },

  footer: {
    menu: {
      heading: "Other products / links",
      links: [
        {
          name: "Some page link",
          url: "#"
        }
      ]
    },
    copyright: `Made by <a class="text-blue-600 hover:underline dark:text-gray-200" href="https://apvarun.com/">apvarun</a>, for the community. All rights reserved.`,
  }
};
