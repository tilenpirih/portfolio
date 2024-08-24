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
  <top />
  <div class="bg-surface">
    <v-container class="py-8">
      <div data-aos="fade-down" class="text-h3 text-primary text-center mb-2">
        About
      </div>
      <div data-aos="fade-up" class="text-center">
        My name is Tilen Pirih, and I'm a passionate Fullstack Developer from Slovenia.
        With a strong focus on frontend development, I specialize in building dynamic and responsive applications using Vue.js and Nuxt.js.
        I thrive on new challenges and am constantly seeking to expand my skillset by exploring and mastering new technologies.
        Whether it's crafting seamless user interfaces or optimizing backend processes, I'm always eager to contribute and grow as a developer.
      </div>
    </v-container>
  </div>
  <v-container class="py-8">
    <div data-aos="fade-down" class="text-h3 text-primary text-center mb-2">
      Skills
    </div>
    <v-row>
      <v-col data-aos="fade-up" cols="12" md="6" class="px-6">
        <div class="text-center text-h5">
          Vue / Nuxt
        </div>
        <v-progress-linear color="primary" model-value="9" max="10" />
      </v-col>
      <v-col data-aos="fade-up" cols="12" md="6" class="px-6">
        <div class="text-center text-h5">
          JS / TS
        </div>
        <v-progress-linear color="primary" model-value="9" max="10" />
      </v-col>
      <v-col data-aos="fade-up" cols="12" md="6" class="px-6">
        <div class="text-center text-h5">
          HTML, CSS / SCSS
        </div>
        <v-progress-linear color="primary" model-value="8" max="10" />
      </v-col>
      <v-col data-aos="fade-up" cols="12" md="6" class="px-6">
        <div class="text-center text-h5">
          SQL, Postgress, ORMs
        </div>
        <v-progress-linear color="primary" model-value="8" max="10" />
      </v-col>
      <v-col data-aos="fade-up" cols="12" md="6" class="px-6">
        <div class="text-center text-h5">
          FastApi / Flask
        </div>
        <v-progress-linear color="primary" model-value="8" max="10" />
      </v-col>
      <v-col data-aos="fade-up" cols="12" md="6" class="px-6">
        <div class="text-center text-h5">
          Git workflow
        </div>
        <v-progress-linear color="primary" model-value="8" max="10" />
      </v-col>
      <v-col data-aos="fade-up" cols="12" md="6" class="px-6">
        <div class="text-center text-h5">
          Docker
        </div>
        <v-progress-linear color="primary" model-value="7" max="10" />
      </v-col>
      <v-col data-aos="fade-up" cols="12" md="6" class="px-6">
        <div class="text-center text-h5">
          Linux
        </div>
        <v-progress-linear color="primary" model-value="7" max="10" />
      </v-col>
    </v-row>
  </v-container>
  <div class="bg-surface">
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