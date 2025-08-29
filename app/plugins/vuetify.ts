import type { ThemeDefinition } from 'vuetify'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { sl } from 'vuetify/locale'
// import 'vuetify/styles'

// #4290f5
const light: ThemeDefinition = {
  colors: {
    'background': '#eeedf2',
    'surface': '#f9f9fd',
    'surface-dim': '#dadade',
    'surface-bright': '#f9f9fd',
    'surface-container-lowest': '#ffffff',
    'surface-container-low': '#f3f3f8',
    'surface-container': '#eeedf2',
    'surface-container-high': '#e8e8ec',
    'surface-container-highest': '#e2e2e6',
    'on-surface': '#1a1c1f',
    'outline': '#747780',
    'outline-variant': '#c4c6d0',
    'primary': '#3f5f90',
    'on-primary': '#ffffff',
    'primary-container': '#d5e3ff',
    'on-primary-container': '#001b3c',
    // 'secondary': '#186683',
    // 'on-secondary': '#ffffff',
    // 'secondary-container': '#c0e8ff',
    // 'on-secondary-container': '#001e2b',
    // 'tertiary': '#5e578f',
    // 'on-tertiary': '#ffffff',
    // 'tertiary-container': '#e5deff',
    // 'on-tertiary-container': '#1a1248',
    'error': '#ba1a1a',
    'on-error': '#ffffff',
    'error-container': '#ffdad6',
    'on-error-container': '#410002',
    'surface-light': '#e8e8ec',
  },
  dark: false,
  variables: {
    'overlay-background': '#181c23',
  },
}

const dark: ThemeDefinition = {
  colors: {
    'background': '#1e2023',
    'surface': '#121317',
    'surface-dim': '#121317',
    'surface-bright': '#38393d',
    'surface-container-lowest': '#0c0e11',
    'surface-container-low': '#1a1c1f',
    'surface-container': '#1e2023',
    'surface-container-high': '#282a2d',
    'surface-container-highest': '#333538',
    'on-surface': '#e2e2e6',
    'outline': '#8e909a',
    'outline-variant': '#43474f',
    'primary': '#a8c8ff',
    'on-primary': '#06305e',
    'primary-container': '#254776',
    'on-primary-container': '#d5e3ff',
    'secondary': '#8dcff1',
    'on-secondary': '#003548',
    'secondary-container': '#004d66',
    'on-secondary-container': '#c0e8ff',
    'tertiary': '#c7bfff',
    'on-tertiary': '#2f295e',
    'tertiary-container': '#464076',
    'on-tertiary-container': '#e5deff',
    'error': '#ffb4ab',
    'on-error': '#690005',
    'error-container': '#93000a',
    'on-error-container': '#ffb4ab',
    'surface-light': '#38393d',
  },
  dark: true,
  variables: {
    'overlay-background': '#181c23',
  },
}
export default defineNuxtPlugin(app => {
  const themeCookie = useCookie('theme', { path: '/' })
  const vuetify = createVuetify({
    ssr: true,
    theme: {
      defaultTheme: themeCookie.value ? themeCookie.value : 'dark',
      themes: {
        dark,
        light,
      },
      variations: false,
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
      VProgressLinear: {
        rounded: true,
        height: '12',
        color: 'primary',
      },
      VTextField: {
        color: 'primary',
        variant: 'outlined',
      },
      VTextarea: {
        color: 'primary',
        variant: 'outlined',
      },
    },
  })

  app.vueApp.use(vuetify)
})