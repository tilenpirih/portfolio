<script setup lang="ts">
const projects = [
  {
    title: 'Free background remover',
    description: 'Remove image backgrounds instantly and for free. No limits, no hidden fees. Just fast and easy background remover.',
    image: '/img/bg_eraser.webp',
    lazyImage: '/img/lazy/bg_eraser.webp',
    link: '/project/bg_eraser',
    chips: [],
  },
  {
    title: 'Global EST Application',
    description: 'App for creating car damage estimation reports.',
    image: '/img/globalEST.webp',
    lazyImage: '/img/lazy/globalEST.webp',
    link: '/project/global_est_application',
    chips: [],
  },
  {
    title: 'Portfolio',
    description: 'My personal portfolio website. Feel free to use it as a template for your own portfolio.',
    image: '/img/portfolio.webp',
    lazyImage: '/img/lazy/portfolio.webp',
    link: '/project/portfolio',
    chips: [],
  },
  {
    title: 'KK Krka - Image generator',
    description: 'Tool for generating images for social media.',
    image: '/img/krka_social.webp',
    lazyImage: '/img/lazy/krka_social.webp',
    link: '/project/kk_krka_image_generator',
    chips: [],
  },
  {
    title: 'Global PDR Application',
    description: 'PDR application for logging vehicles.',
    image: '/img/globalPDR.webp',
    lazyImage: '/img/lazy/globalPDR.webp',
    link: '/project/global_pdr_application',
    chips: [],
  },
  {
    title: 'Košarkaška zveza Slovenije',
    description: 'Slovenian basketball federation website.',
    image: '/img/kzs.webp',
    lazyImage: '/img/lazy/kzs.webp',
    link: '/project/kzs',
    chips: [],
  },
  {
    title: 'Ventic',
    description: 'Tracking and streaming desktop app.',
    image: '/img/ventic.webp',
    lazyImage: '/img/lazy/ventic.webp',
    link: '/project/ventic',
    chips: [],
  },
  {
    title: 'NK Tolmin',
    description: 'Football club website, where data were automatically gathered with web scraping.',
    image: '/img/nktolmin.webp',
    lazyImage: '/img/lazy/nktolmin.webp',
    link: '/project/nktolmin',
    chips: [],
  },
]
</script>

<template>
  <div id="projects" class="bg-background">
    <v-container class="py-12">
      <div data-aos="fade-down">
        <div class="text-h3 text-primary text-center pb-4">
          Projects
        </div>
      </div>
      <v-row>
        <v-col v-for="(project, index) in projects" :key="index" cols="12" sm="6" lg="4" xl="3">
          <nuxt-link :to="project.link" class="text-decoration-none">
            <div data-aos="flip-up" style="height: 100%;">
              <v-card class="projectCard cursor-pointer h-100 rounded-lg h-full">
                <v-img :src="project.image" :lazy-src="project.lazyImage" aspect-ratio="1.777" />
                <v-card-title class="text-h5 text-primary">
                  {{ project.title }}
                </v-card-title>
                <v-card-text>
                  {{ project.description }}
                </v-card-text>
              </v-card>
            </div>
          </nuxt-link>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped lang="scss">
.projectCard {
  transition: all 0.3s;
}
.projectCard:hover {
  box-shadow: 0 0 4pt 2pt rgb(var(--v-theme-primary));
  scale: 1.03;
  transition: all 0.3s;
}
</style>