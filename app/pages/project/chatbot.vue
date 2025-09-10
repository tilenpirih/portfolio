<script setup lang="ts">
import projectData from '~/data/projects/chatbot'

const runtimeConfig = useRuntimeConfig()
useHead({
  title: projectData.seo.title,
  meta: [
    { name: 'description', content: projectData.seo.description },
    { property: 'og:title', content: projectData.seo.ogTitle },
    { property: 'og:image', content: `${runtimeConfig.public.BASE_URL}${projectData.seo.ogImage}` },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `${runtimeConfig.public.BASE_URL}${projectData.seo.ogUrl}` },
  ],
})
</script>

<template>
  <project :project="projectData" />
</template>
