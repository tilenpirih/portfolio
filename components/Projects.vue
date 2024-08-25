<script setup lang="ts">
const projects = [
  {
    title: 'Global PDR Application',
    description: 'Description 1',
    image: '/img/globalPDR.webp',
    lazyImage: '/img/lazy/globalPDR.webp',
    link: 'https://google.com',
  },
  {
    title: 'EST PDR',
    description: 'Description 1 asdf asd fasd fasd fasdf  asdfa sdfas dfa sdf asdf asdf asdf asd fas dfasd fasd asd fasd fas dfasd fasd fasd fasd fasd f',
    image: '/img/globalPDR.webp',
    lazyImage: '/img/lazy/globalPDR.webp',
    link: 'https://google.com',
  },
  {
    title: 'Global PDR Application',
    description: 'Description 1',
    image: '/img/globalPDR.webp',
    lazyImage: '/img/lazy/globalPDR.webp',
    link: 'https://google.com',
  },
]
</script>

<template>
  <div id="projects" class="bg-surface">
    <v-container>
      <div data-aos="fade-down" class="text-h3 text-primary text-center mb-4">
        Projects
      </div>
      <v-row>
        <v-col v-for="(project, index) in projects" :key="index" cols="12" sm="6" lg="4" xl="3">
          <v-card data-aos="flip-up" class="projectCard h-100 rounded-lg bg-background">
            <v-img :src="project.image" :lazy-src="project.lazyImage" aspect-ratio="1.777" />
            <v-card-title class="text-h5 text-primary">
              {{ project.title }}
            </v-card-title>
            <v-card-text>
              {{ project.description }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>

</style>