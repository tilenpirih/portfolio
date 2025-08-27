<script setup lang="ts">
import bgEraserProject from '~/data/projects/bg-eraser'

const runtimeConfig = useRuntimeConfig()
useHead({
  title: bgEraserProject.seo.title,
  meta: [
    { name: 'description', content: bgEraserProject.seo.description },
    { property: 'og:title', content: bgEraserProject.seo.ogTitle },
    { property: 'og:image', content: `${runtimeConfig.public.BASE_URL}${bgEraserProject.seo.ogImage}` },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `${runtimeConfig.public.BASE_URL}${bgEraserProject.seo.ogUrl}` },
  ],
})
</script>

<template>
  <!-- <ProjectPage :project-data="bgEraserProject" /> -->
  <div>test</div>
</template>
