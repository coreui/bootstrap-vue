import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
import { permalink } from 'markdown-it-anchor'
import pkg from '../package.json'

// const md = require('markdown-it')()
const path = require('path')

export default defineUserConfig<DefaultThemeOptions>({
  base: `/bootstrap-vue/`,
  lang: 'en-US',
  title: 'Bootstrap Vue',
  description: 'Bootstrap UI Components Library for Vue.js (Vue 3)',
  head: [
    ['link', { rel: 'icon', href: `/bootstrap-vue/favicons/favicon-96x96.png` }],
    // ['link', { rel: 'manifest', href: '/favicons/manifest.json' }],
    ['script', { src: 'https://media.ethicalads.io/media/client/ethicalads.min.js' }],
  ],
  extendsMarkdown: (md) => {
    md.use(require('markdown-it-include')),
      (md.renderer.rules.table_open = function (tokens, idx) {
        return '<table class="table table-striped table-api">'
      })
  },
  markdown: {
    anchor: {
      permalink: permalink.ariaHidden({
        class: 'anchor-link',
        placement: 'after',
      }),
    },
  },
  bundler: '@vuepress/bundler-webpack',
  bundlerConfig: {
    chainWebpack: (config) => {
      config.resolve.set('fallback', {
        assert: require.resolve('assert'),
        constants: require.resolve('constants-browserify'),
        fs: false,
        os: require.resolve('os-browserify/browser'),
      })
    },
  },
  plugins: [
    '@vuepress/plugin-toc',
    [
      '@vuepress/container',
      {
        type: 'demo',
        render: function (tokens, idx) {
          if (tokens[idx].nesting === 1) {
            return '<div class="docs-example border rounded-top p-4">\n'
          } else {
            return '</div>\n'
          }
        },
      },
    ],
    [
      '@vuepress/container',
      {
        type: 'demo-dark',
        render: function (tokens, idx) {
          if (tokens[idx].nesting === 1) {
            return '<div class="docs-example rounded-top p-4 bg-dark">\n'
          } else {
            return '</div>\n'
          }
        },
      },
    ],
  ],
  theme: path.resolve(__dirname, './theme-bootstrap-vue'),
  themeConfig: {
    sidebar: [
      {
        text: 'Getting started',
        link: `/getting-started/`,
        children: [
          {
            text: 'Introduction',
            link: `/getting-started/introduction.html`,
          },
        ],
      },
      {
        text: 'Layout',
        link: `/layout/`,
        children: [
          {
            text: 'Breakpoints',
            link: `/layout/breakpoints.html`,
          },
          {
            text: 'Columns',
            link: `/layout/columns.html`,
          },
          {
            text: 'Containers',
            link: `/layout/containers.html`,
          },
          {
            text: 'Grid',
            link: `/layout/grid.html`,
          },
          {
            text: 'Gutters',
            link: `/layout/gutters.html`,
          },
        ],
      },
      {
        text: 'Forms',
        link: `/forms/`,
        children: [
          {
            text: 'Overview',
            link: `/forms/overview.html`,
          },
          {
            text: 'Form control',
            link: `/forms/form-control.html`,
          },
          {
            text: 'Select',
            link: `/forms/select.html`,
          },
          {
            text: 'Checks & radios',
            link: `/forms/checks-radios.html`,
          },
          {
            text: 'Range',
            link: `/forms/range.html`,
          },
          {
            text: 'Floating labels',
            link: `/forms/floating-labels.html`,
          },
          {
            text: 'Input group',
            link: `/forms/input-group.html`,
          },
          {
            text: 'Layout',
            link: `/forms/layout.html`,
          },
          {
            text: 'Validation',
            link: `/forms/validation.html`,
          },
        ],
      },
      {
        text: 'Components',
        link: `/components/`,
        children: [
          {
            text: 'Accordion',
            link: `/components/accordion.html`,
          },
          {
            text: 'Alert',
            link: `/components/alert.html`,
          },
          {
            text: 'Badge',
            link: `/components/badge.html`,
          },
          {
            text: 'Breadcrumb',
            link: `/components/breadcrumb.html`,
          },
          {
            text: 'Buttons',
            link: `/components/button.html`,
          },
          {
            text: 'Button Group',
            link: `/components/button-group.html`,
          },
          {
            text: 'Card',
            link: `/components/card.html`,
          },
          {
            text: 'Carousel',
            link: `/components/carousel.html`,
          },
          {
            text: 'Chart',
            link: `/components/chart.html`,
          },
          {
            text: 'Close Button',
            link: `/components/close-button.html`,
          },
          {
            text: 'Collapse',
            link: `/components/collapse.html`,
          },
          {
            text: 'Dropdown',
            link: `/components/dropdown.html`,
          },
          {
            text: 'Icon',
            link: `/components/icon.html`,
          },
          {
            text: 'Image',
            link: `/components/image.html`,
          },
          {
            text: 'List Group',
            link: `/components/list-group.html`,
          },
          {
            text: 'Modal',
            link: `/components/modal.html`,
          },
          {
            text: 'Navs & Tabs',
            link: `/components/navs-tabs.html`,
          },
          {
            text: 'Navbar',
            link: `/components/navbar.html`,
          },
          {
            text: 'Offcanvas',
            link: `/components/offcanvas.html`,
          },
          {
            text: 'Pagination',
            link: `/components/pagination.html`,
          },
          {
            text: 'Placeholder',
            link: `/components/placeholder.html`,
          },
          {
            text: 'Popover',
            link: `/components/popover.html`,
          },
          {
            text: 'Progress',
            link: `/components/progress.html`,
          },
          {
            text: 'Spinner',
            link: `/components/spinner.html`,
          },
          {
            text: 'Table',
            link: `/components/table.html`,
          },
          {
            text: 'Toast',
            link: `/components/toast.html`,
          },
          {
            text: 'Tooltip',
            link: `/components/tooltip.html`,
          },
        ],
      },
    ],
  },
})
