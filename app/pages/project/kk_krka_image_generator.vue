<script setup lang="ts">
import projectData from '~/data/projects/kkKrkaImageGenerator'

const siteUrl = useSiteUrl()
useHead({
  title: projectData.seo.title,
  meta: [
    { name: 'description', content: projectData.seo.description },
    { property: 'og:title', content: projectData.seo.ogTitle },
    { property: 'og:image', content: `${siteUrl}${projectData.seo.ogImage}` },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `${siteUrl}${projectData.seo.ogUrl}` },
  ],
})
</script>

<template>
  <project :project="projectData" />
</template>
