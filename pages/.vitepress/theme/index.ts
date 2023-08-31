import DefaultTheme from 'vitepress/theme'
import './custom.css'

DefaultTheme.themeConfig = {
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present Evan You'
    }
  }

export default DefaultTheme;