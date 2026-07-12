import { forVuetify as breakpoints } from './app/theme/breakpoints'
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
    '@nuxt/image',
  ],

  // <nuxt-img sizes> resolves its `sm:`/`lg:` prefixes against these, so they
  // have to be Vuetify's thresholds — otherwise a size hint would switch at a
  // different width than the <v-col> it describes actually reflows at.
  // `xs` is the exception: Vuetify's is 0, but nuxt/image multiplies the screen
  // width by the vw hint to size a srcset candidate, and 0 yields a useless 1px
  // one. 320 is the narrowest phone worth serving. Only affects images.
  image: {
    screens: { ...breakpoints, xs: 320 },
    // IPX defaults to 80, which re-encodes our already-compressed source webps
    // into *bigger* files at their native size (profile.webp: 60kB in, 62kB out).
    // 75 is the point where every output is smaller than its source. Raise it if
    // you can see the difference.
    quality: 75,
  },

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
