<script setup lang="ts">
import { mdiThemeLightDark } from '@mdi/js'
import { useTheme } from 'vuetify'

const theme = useTheme()
const cookie = useThemeCookie()

function switchTheme() {
  const next = theme.name.value === 'light' ? 'dark' : 'light'
  theme.change(next)
  // plugins/theme.ts reads this back during SSR on the next visit.
  cookie.value = next
}
</script>

<template>
  <v-btn
    variant="text"
    size="small"
    :icon="mdiThemeLightDark"
    :aria-label="`Switch to ${theme.name.value === 'dark' ? 'light' : 'dark'} theme`"
    @click="switchTheme()"
  />
</template>
