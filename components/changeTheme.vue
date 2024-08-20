<script setup lang="ts">
import { mdiThemeLightDark } from '@mdi/js'
import { useTheme } from 'vuetify'

const defaultTheme = useTheme().themes.value.defaultTheme

const darkTheme = ref({
  primary: '#a8c8ff',
  secondary: '#bdc7dc',
  background: '#111318',
  surface: '#1d2024',
  dark: true,
})
const lightTheme = ref({
  primary: '#3f5f90',
  secondary: '#555f71',
  background: '#f9f9ff',
  surface: '#ededf4',
  dark: true,
})

function switchTheme() {
  if (defaultTheme.dark) {
    defaultTheme.dark = false
    defaultTheme.colors.primary = lightTheme.value.primary
    defaultTheme.colors.secondary = lightTheme.value.secondary
    defaultTheme.colors.surface = lightTheme.value.surface
    defaultTheme.colors.background = lightTheme.value.background
  }
  else {
    defaultTheme.dark = true
    defaultTheme.colors.primary = darkTheme.value.primary
    defaultTheme.colors.secondary = darkTheme.value.secondary
    defaultTheme.colors.surface = darkTheme.value.surface
    defaultTheme.colors.background = darkTheme.value.background
  }

  setThemeToLocalStorage()
}
function setThemeToLocalStorage() {
  const theme = {
    dark: defaultTheme.dark,
    primary: defaultTheme.colors.primary,
    secondary: defaultTheme.colors.secondary,
    surface: defaultTheme.colors.surface,
    background: defaultTheme.colors.background,
  }
  localStorage.setItem('theme', JSON.stringify(theme))
}
</script>

<template>
  <v-btn variant="text" size="small" :icon="mdiThemeLightDark" @click="switchTheme()" />
</template>
