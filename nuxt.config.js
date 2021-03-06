import colors from 'vuetify/es5/util/colors'

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - Panor.am',
    title: 'Panor.am',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/composition-api',
    // Google Analytics setup https://nuxtjs.org/faq/ga
    { src: '~plugins/ga.js', mode: 'client' },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/vuetify
    [
      '@nuxtjs/vuetify',
      {
        defaultAssets: false,
      },
    ],
    // https://purgecss.com/guides/nuxt.html#nuxt-js
    'nuxt-purgecss',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {},

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    defaultAssets: false,
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  purgeCSS: {
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'node_modules/vuetify/src/**/*.ts',
      'node_modules/vuetify/src/**/*.js',
    ],
    styleExtensions: ['.css'],
    safelist: {
      standard: ['body', 'html', 'nuxt-progress'],
      deep: [
        /page-enter/,
        /page-leave/,
        /dialog-transition/,
        /tab-transition/,
        /tab-reversetransition/,
      ],
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    analyze: process.env.BUILD_ANALYZE || false,
    parallel: false,
    extractCSS: true,
    splitChunks: {
      minSize: 20000,
      maxSize: 60000,
      enforceSizeThreshold: 50000,
      layouts: true,
      pages: true,
      commons: true,
    },
  },

  render: {
    crossorigin: '',
  },

  router: {
    base: process.env.BASE_URL || '/',
  },

  generate: {
    generate: {
      async routes() {
        const { $content } = require('@nuxt/content')
        const files = await $content({ deep: true }).only(['path']).fetch()

        return files.map((file) => (file.path === '/index' ? '/' : file.path))
      },
    },
    cache: {
      ignore: [
        'lighthouserc.pr.js',
        'budget.json',
        'README.md',
        '.github',
        '.idea',
        'dist',
        'node_modules',
        'test',
        'cypress',
      ],
    },
  },
}
