<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
useHead({
  title: 'Tilen Pirih - Fullstack developer',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'description', content: 'My portfolio' },
    { name: 'keywords', content: 'portfolio, developer, fullstack, frontend, backend, Tilen, Pirih' },
    { name: 'author', content: 'Tilen Pirih' },
    { property: 'og:title', content: 'Tilen Pirih - Fullstack developer' },
    { property: 'og:image', content: `${runtimeConfig.public.BASE_URL}/img/OGImage.webp` },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `${runtimeConfig.public.BASE_URL}` },
  ],
})
</script>

<template>
  <v-app class="bg-background">
    <navbar style="margin-bottom: 64px;" />
    <v-main>
      <slot />
    </v-main>
    <custom-footer />
  </v-app>
</template>