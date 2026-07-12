// Applies the saved theme before Vuetify is created, on the server as well as
// the client, so the markup ships with the right theme already on it — no flash
// and no hydration mismatch.
//
// vuetify-nuxt-module used to do this via ssrClientHints, but that sends a
// Critical-CH header, which makes the browser throw away and re-issue the first
// request (~600ms on every first visit). The cost of doing it this way is that
// we can't know the OS colour scheme during SSR, so a first-time visitor gets
// vuetifyOptions' defaultTheme until they touch the toggle.
export default defineNuxtPlugin({
  name: 'restore-theme',
  enforce: 'pre',
  setup(nuxtApp) {
    const theme = useThemeCookie()

    nuxtApp.hook('vuetify:before-create', ({ vuetifyOptions }) => {
      if (!theme.value)
        return

      vuetifyOptions.theme = vuetifyOptions.theme ?? {}
      vuetifyOptions.theme.defaultTheme = theme.value
    })
  },
})
