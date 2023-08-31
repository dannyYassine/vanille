import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [['link', { rel: 'icon', href: '/vanille/favicon.ico' }]],
  title: "vanille",
  base: '/vanille/',
  description: "A minimalistic vanilla web component framework",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide' },
      { text: 'Recipes', link: '/recipes' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Getting started', link: '/getting-started' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
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
})
