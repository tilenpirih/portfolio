<script setup lang="ts">
const projects = [
  {
    title: 'KK Krka - Image generator',
    description: 'Tool for generating images for social media.',
    image: '/img/krka_social.webp',
    lazyImage: '/img/lazy/krka_social.webp',
    link: '/project/kk_krka_image_generator',
  },
  {
    title: 'Ventic',
    description: 'Tracking and streaming desktop app.',
    image: '/img/ventic.webp',
    lazyImage: '/img/lazy/ventic.webp',
    link: '/project/ventic',
  },
  {
    title: 'Global EST Application',
    description: 'App for creating car damage estimation reports.',
    image: '/img/globalPDR.webp',
    lazyImage: '/img/lazy/globalPDR.webp',
    link: 'https://google.com',
  },
  {
    title: 'Global EST Application',
    description: 'App for creating car damage estimation reports.',
    image: '/img/globalPDR.webp',
    lazyImage: '/img/lazy/globalPDR.webp',
    link: 'https://google.com',
  },
  {
    title: 'Global EST Application',
    description: 'App for creating car damage estimation reports.',
    image: '/img/globalPDR.webp',
    lazyImage: '/img/lazy/globalPDR.webp',
    link: 'https://google.com',
  },
  {
    title: 'Global EST Application',
    description: 'App for creating car damage estimation reports.',
    image: '/img/globalPDR.webp',
    lazyImage: '/img/lazy/globalPDR.webp',
    link: 'https://google.com',
  },
]
</script>

<template>
  <div id="projects" class="bg-surface">
    <v-container class="py-12">
      <div data-aos="fade-down" class="text-h3 text-primary text-center pb-4">
        Projects - (todo)
      </div>
      <v-row>
        <v-col v-for="(project, index) in projects" :key="index" cols="12" sm="6" lg="4" xl="3">
          <nuxt-link :to="project.link" class="text-decoration-none">
            <v-card data-aos="flip-up" class="projectCard h-100 rounded-lg bg-background">
              <v-img :src="project.image" :lazy-src="project.lazyImage" aspect-ratio="1.777" />
              <v-card-title class="text-h5 text-primary">
                {{ project.title }}
              </v-card-title>
              <v-card-text>
                {{ project.description }}
              </v-card-text>
            </v-card>
          </nuxt-link>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped lang="scss">
.projectCard {
  transition: all 0.3s;
  cursor: pointer;
}
.projectCard:hover {
  box-shadow: 0 0 4pt 2pt rgb(var(--v-theme-primary));
  scale: 1.03;
  transition: all 0.3s;
}
</style>