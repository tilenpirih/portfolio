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
    head: {
      // Without this a screen reader reads the page in whatever language the
      // user configured it for, mispronouncing everything.
      htmlAttrs: { lang: 'en' },
    },
  },

  modules: [
    '@unocss/nuxt',
    'vuetify-nuxt-module',
    'motion-v/nuxt',
    'nuxt-particles',
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxt/scripts',
  ],

  // Deployment is a bare `node server/index.mjs` behind an nginx ingress, and
  // ingress-nginx has gzip off by default — so nothing compressed the 1MB of
  // JS/CSS we were shipping. This precompresses it at build time (no request-
  // time CPU cost); server/plugins/compression.ts covers the SSR HTML, which
  // isn't a static asset and so can't be precompressed.
  nitro: {
    compressPublicAssets: { gzip: true, brotli: true },
  },

  routeRules: {
    // IPX serves these with a 60s TTL by default, so every repeat visitor
    // re-downloaded every image. The transform params are in the URL, but the
    // *source* filename is not — replacing public/img/x.webp in place while
    // keeping the name will serve stale images for a year. Rename on change.
    '/_ipx/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
  },

  // Defaults to 'full', which pulls in every tsparticles shape, plugin and
  // interaction (~140kB). Top.vue only uses circle/move/links/repulse — all in
  // slim. Bump this back to 'full' if a particle option stops taking effect.
  particles: {
    mode: 'slim',
  },

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

  // No ssrClientHints. It sends a Critical-CH header, which makes the browser
  // discard and re-issue the very first request to resupply the hints — ~600ms
  // on every first visit, and Lighthouse fails `redirects` because of it.
  // What it did for us instead:
  //   - prefersColorScheme -> plugins/theme.ts restores the theme from a cookie.
  //     We lose OS colour-scheme detection for a first-time visitor, who now
  //     gets vuetifyOptions.defaultTheme until they use the toggle.
  //   - viewportSize -> navbar.vue and project.vue use CSS breakpoints now, so
  //     nothing needs the viewport width to be known during SSR.
  vuetify: {
    moduleOptions: {
      styles: { configFile: 'app/assets/css/settings.scss' },
    },
    vuetifyOptions: vuetifyConfig,
  },
  // Inlined <style> blocks land outside the @layer order set in layers.css, so
  // they would trump both Vuetify's component CSS and the UnoCSS utilities.
  // (It also doesn't work here: Nuxt only inlines component-attributed CSS, and
  // Vuetify's and UnoCSS's arrive as global stylesheets.)
  // The stylesheet still gets inlined — whole, order intact — by
  // server/plugins/inline-css.ts, which is what keeps first paint from waiting
  // a full round trip on a render-blocking <link>.
  features: {
    inlineStyles: false,
  },

  vite: {
    build: {
      // Every chunk's CSS is otherwise its own render-blocking <link> — 8 of them
      // on the homepage, and nothing paints until the last one lands. One file
      // costs slightly more CSS up front (~14kB brotli for the whole site) and
      // saves the round trips, which is what actually hurts on a slow connection.
      // Concatenation follows the import graph, so layers.css lands first and the
      // @layer order holds.
      cssCodeSplit: false,
    },
    optimizeDeps: {
      include: [
        '@mdi/js',
      ],
    },
  },
})