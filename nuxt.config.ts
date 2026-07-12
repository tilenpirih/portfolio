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
  css: [
    '@/assets/css/layers.css',
  ],

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  modules: [
    '@unocss/nuxt',
    'vuetify-nuxt-module',
    'motion-v/nuxt',
    'nuxt-particles',
    '@nuxt/scripts',
  ],
  vuetify: {
    moduleOptions: {
      styles: { configFile: 'app/assets/css/settings.scss' },
      ssrClientHints: {
        reloadOnFirstRequest: false,
        prefersColorScheme: true,
        prefersColorSchemeOptions: {
          useBrowserThemeOnly: false,
        },
        viewportSize: true,
      },
    },
    vuetifyOptions: vuetifyConfig,
  },
  // Inlined <style> blocks land outside the @layer order set in layers.css, so
  // they would trump both Vuetify's component CSS and the UnoCSS utilities.
  features: {
    inlineStyles: false,
  },
})
