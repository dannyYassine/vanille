import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [['link', { rel: 'icon', href: '/vanille/favicon.ico' }]],
  title: 'vanille',
  base: '/vanille/',
  description: 'A minimalistic vanilla web component framework',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/what-is-vanille' },
      { text: 'Recipes', link: '/state-management' }
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'What is vanille?', link: '/what-is-vanille' },
          { text: 'Quick start', link: '/quick-start' }
        ]
      },
      {
        text: 'Component',
        items: [
          { text: 'Always web component', link: '/always-web-component' },
          { text: 'JSX', link: '/jsx' }
        ]
      },
      {
        text: 'Observables',
        items: [{ text: 'Observe everything', link: '/observe-everything' }]
      },
      {
        text: 'Routing',
        items: [{ text: 'Simple routes', link: '/simple-routes' }]
      },
      {
        text: 'Recipes',
        items: [{ text: 'State management', link: '/state-management' }]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/dannyYassine/vanille' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present Danny Yassine'
    }
  }
});
