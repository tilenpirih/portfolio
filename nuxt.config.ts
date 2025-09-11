import vuetifyConfig from './vuetify.config'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  runtimeConfig: {
    EMAILJS_PUBLIC_KEY: process.env.EMAILJS_PUBLIC_KEY,
    EMAILJS_PRIVATE_KEY: process.env.EMAILJS_PRIVATE_KEY,
    EMAILJS_SERVICE_ID: process.env.EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID: process.env.EMAILJS_TEMPLATE_ID,
    public: {
      BASE_URL: process.env.BASE_URL,
    },
  },
  build: {
    transpile: ['vuetify'],
  },
  css: [
    '@/assets/css/main.scss',
    '@/assets/css/vuetify/main.scss',
  ],

  modules: [
    'vuetify-nuxt-module',
    'nuxt-aos',
    'nuxt-particles',
    '@nuxt/scripts',
  ],
  vuetify: {
    moduleOptions: {
      ssrClientHints: {
        reloadOnFirstRequest: false,
        prefersColorScheme: true,
        prefersColorSchemeOptions: {
          useBrowserThemeOnly: false,
        },
        viewportSize: true,
      },
      disableVuetifyStyles: true,
    },
    vuetifyOptions: vuetifyConfig,
  },
  vite: {
    optimizeDeps: {
      include: ['aos'],
    },
    // css: {
    //   preprocessorOptions: {
    //     scss: {
    //       additionalData: '@use "@/assets/css/vuetify/main.scss" as *;',
    //     },
    //   },
    // },
    // css: {
    //   preprocessorOptions: {
    //     scss: {
    //       api: 'modern',
    //     },
    //   },
    // },
  },
  aos: {
    once: true,
  },

  // nitro: {
  //   preset: 'bun',
  // },
})
