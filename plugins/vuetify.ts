import type { ThemeDefinition } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { VNumberInput } from 'vuetify/labs/VNumberInput'
import { sl } from 'vuetify/locale'

// #4290f5
const defaultTheme: ThemeDefinition = {
  dark: true,
  colors: {
    primary: '#a8c8ff',
    secondary: '#bdc7dc',
    background: '#111318',
    surface: '#1d2024',
    danger: '#FE4543',
    text: '#d5e3ff',
  },
}

if (import.meta.client) {
  const localTheme = JSON.parse(localStorage.getItem('theme') as string)
  if (localTheme && defaultTheme.colors) {
    defaultTheme.dark = localTheme.dark
    defaultTheme.colors.primary = localTheme.primary
    defaultTheme.colors.secondary = localTheme.secondary
    defaultTheme.colors.background = localTheme.background
    defaultTheme.colors.surface = localTheme.surface
    if (localTheme.danger)
      defaultTheme.colors.danger = localTheme.danger
    if (localTheme.error)
      defaultTheme.colors.error = localTheme.error
    if (localTheme.info)
      defaultTheme.colors.info = localTheme.info
    if (localTheme.success)
      defaultTheme.colors.success = localTheme.success
    if (localTheme.warning)
      defaultTheme.colors.warning = localTheme.warning
  }
}
export default defineNuxtPlugin(app => {
  const vuetify = createVuetify({
    components: {
      ssr: true,
      VNumberInput,
    },
    theme: {
      defaultTheme: 'defaultTheme',
      themes: {
        defaultTheme,
      },
    },
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
    },
    locale: {
      locale: 'sl',
      fallback: 'en',
      messages: { sl },
    },
    defaults: {
      VBtn: {
        color: 'primary',
        class: 'text-none',
      },
    },
  })

  app.vueApp.use(vuetify)
})