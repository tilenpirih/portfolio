import presetWind4 from '@unocss/preset-wind4'
import { defineConfig } from 'unocss'
import { createThemeVariants, typographyPresets } from 'unocss-preset-vuetify'
import { forUnoCSS as breakpoints } from './app/theme/breakpoints'

// Vuetify emits --v-theme-<name> and a matching --v-theme-on-<name> for every
// colour in the theme, so both halves of each pair are addressable here.
const themeColors = [
  'primary',
  'secondary',
  'tertiary',
  'background',
  'surface',
  'surface-light',
  'success',
  'info',
  'warning',
  'error',
  'error-container',
] as const

// Plain rgb(), no %alpha placeholder: presetWind4 applies the opacity modifier
// by wrapping the colour in color-mix(), so `border-primary/50` works from this.
const colors = Object.fromEntries(
  themeColors.flatMap(name => [
    [name, `rgb(var(--v-theme-${name}))`],
    [`on-${name}`, `rgb(var(--v-theme-on-${name}))`],
  ]),
)

function toKebab(css: Record<string, string | number>) {
  return Object.fromEntries(
    Object.entries(css).map(([prop, value]) => [
      prop.replace(/[A-Z]/g, char => `-${char.toLowerCase()}`),
      String(value),
    ]),
  )
}

export default defineConfig({
  presets: [
    presetWind4({
      // Vuetify ships its own reset; a second one fights it.
      preflights: { reset: false },
      dark: {
        dark: '.v-theme--dark',
        light: '.v-theme--light',
      },
    }),
  ],
  outputToCssLayers: {
    cssLayerName: layer => layer === 'properties' ? null : `uno-${layer}`,
  },
  variants: createThemeVariants(['light', 'dark']),
  theme: {
    breakpoint: breakpoints,
    colors,
  },
  // Vuetify's md2 type scale, so text-h1..text-h6 keep the sizes the design was
  // built against. `subtitle1` -> `text-subtitle-1`, `h1` -> `text-h1`.
  // Unlike Vuetify's bg-*, wind4's sets only the background and not the paired
  // on-* foreground, so anything on a coloured surface states its text-on-* class.
  rules: [
    ...Object.entries(typographyPresets.md2).map(([key, css]) => [
      `text-${key.replace(/^(subtitle|body)(\d)$/, '$1-$2')}`,
      toKebab(css),
    ] as [string, Record<string, string>]),
    // Vuetify's text-opacity utilities. The --v-*-opacity vars come from the
    // theme composable at runtime, so these still follow light/dark.
    [/^text-(high-emphasis|medium-emphasis|disabled)$/, ([, name]) => ({
      color: `rgba(var(--v-theme-on-background), var(--v-${name}-opacity))`,
    })],
  ],
})
