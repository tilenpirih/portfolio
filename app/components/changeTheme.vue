<script setup lang="ts">
import { mdiThemeLightDark } from '@mdi/js'
import { useTheme } from 'vuetify'

const theme = useTheme()
function switchTheme() {
  if (theme.name.value === 'light')
    theme.change('dark')
  else
    theme.change('light')

  document.cookie = `theme=${theme.name.value}; path=/`
}
</script>

<template>
  <v-btn variant="text" size="small" :icon="mdiThemeLightDark" @click="switchTheme()" />
</template>
