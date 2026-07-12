<script setup lang="ts">
const siteUrl = useSiteUrl()
const route = useRoute()

useHead({
  title: 'Tilen Pirih - Fullstack developer',
  link: [
    { rel: 'canonical', href: computed(() => `${siteUrl}${route.path}`) },
  ],
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'description', content: 'Portfolio of Tilen Pirih, a self-employed fullstack developer from Slovenia building web apps with Vue, Nuxt, Python and Postgres.' },
    { name: 'author', content: 'Tilen Pirih' },
    { property: 'og:title', content: 'Tilen Pirih - Fullstack developer' },
    { property: 'og:image', content: `${siteUrl}/img/OGImage.webp` },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: 'Tilen Pirih - Fullstack developer' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: computed(() => `${siteUrl}${route.path}`) },
    { name: 'twitter:card', content: 'summary_large_image' },
  ],
})
</script>

<template>
  <motion-config reduced-motion="user">
    <v-app class="bg-surface">
      <!-- The navbar is fixed and sits first in the tab order, so without this a
           keyboard user tabs through all of it on every page before the content. -->
      <a href="#main" class="skip-link">Skip to main content</a>
      <v-main id="main">
        <navbar style="margin-bottom: 64px;" />
        <slot />
      </v-main>
      <custom-footer />
    </v-app>
  </motion-config>
</template>

<style scoped lang="scss">
.skip-link {
  position: fixed;
  top: 8px;
  left: 8px;
  z-index: 10000;
  padding: 8px 16px;
  border-radius: 8px;
  background-color: rgb(var(--v-theme-surface));
  color: rgb(var(--v-theme-primary));
  transform: translateY(-200%);

  &:focus {
    transform: translateY(0);
  }
}
</style>
