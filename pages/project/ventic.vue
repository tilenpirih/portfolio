<script setup lang="ts">
import { mdiGithub } from '@mdi/js'
import { useDisplay } from 'vuetify'

const display = useDisplay()

const buttonSize = ref(100)
watch(() => display.mobile.value, value => {
  buttonSize.value = value ? 80 : 100
})

const technologies = [
  {
    icon: '/img/technologies/vue.svg',
    link: 'https://vuejs.org/',
  },
  {
    icon: '/img/technologies/electron.svg',
    link: 'https://www.electronjs.org/',
  },
  {
    icon: '/img/technologies/vuetify.svg',
    link: 'https://vuetifyjs.com/',
  },
  {
    icon: '/img/technologies/vuex.svg',
    link: 'https://vuex.vuejs.org/',
  },
  {
    icon: '/img/technologies/tmdb.svg',
    link: 'https://www.themoviedb.org/',
  },
  {
    icon: '/img/technologies/js.svg',
    link: 'https://www.w3schools.com/js/',
  },
  {
    icon: '/img/technologies/videojs.svg',
    link: 'https://videojs.com/',
  },
  {
    icon: '/img/technologies/nodejs.svg',
    link: 'https://nodejs.org/en',
  },
]

const runtimeConfig = useRuntimeConfig()
useHead({
  title: 'Project Ventic',
  meta: [
    { name: 'description', content: 'This project was originally designed to be an all-in-one tool for streaming various types of media. It was one of my first ventures into the Vue ecosystem and desktop application development. Unfortunately, due to time constraints and other commitments, I had to put it on hold. However, the experience was invaluable, and I gained a lot from it.' },
    { property: 'og:title', content: 'Project Ventic' },
    { property: 'og:image', content: `${runtimeConfig.public.BASE_URL}/img/ventic.webp` },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `${runtimeConfig.public.BASE_URL}/project/ventic` },
  ],
})
</script>

<template>
  <v-container class="py-16">
    <v-row class="justify-center align-center">
      <v-col cols="12" md="6" lg="6" class="d-flex align-center">
        <div style="width: 100%;">
          <div class="text-h3 text-lg-h2 text-primary text-center">
            <div data-aos="fade-down">
              Ventic
            </div>
            <nuxt-link to="https://github.com/tilenpirih/ventic-clone">
              <v-btn data-aos="fade-up" variant="outlined" class="rounded-pill m-auto">
                <v-icon :icon="mdiGithub" size="large" class="mr-2" />
                Source code
              </v-btn>
            </nuxt-link>
          </div>
        </div>
      </v-col>
      <v-col data-aos="flip-up" cols="12" md="6" class="d-flex justify-center">
        <v-img max-width="600" aspect-ratio="1.84173" src="/img/ventic.webp" class="rounded-lg" lazy-src="/img/lazy/ventic.webp" />
      </v-col>
    </v-row>
  </v-container>
  <div class="bg-surface py-5">
    <v-container>
      <div data-aos="fade-down" class="text-h4 text-primary text-center mb-2">
        About
      </div>
      <div class="text-center">
        This project was originally designed to be an all-in-one tool for streaming various types of media. It was one of my first ventures into the Vue ecosystem and desktop application development. Unfortunately, due to time constraints and other commitments, I had to put it on hold. However, the experience was invaluable, and I gained a lot from it.
        <br>
        While several features are still missing, the tool is already great for discovering new movies, shows, actors, and watching trailers. I plan to revisit this project, rewriting it using Vue 3 and switching from Electron to Tauri, with the goal of delivering a fully polished product.
      </div>
    </v-container>
  </div>

  <v-container class="py-9">
    <v-row class="justify-space-between">
      <v-col cols="12" md="6" lg="5" class="d-flex flex-column">
        <div data-aos="fade-down" class="text-h4 text-primary text-center mb-4">
          Technologies
        </div>
        <div class="h-100 d-flex align-center">
          <v-row class="justify-center">
            <v-col v-for="tech in technologies" :key="tech.link" cols="auto">
              <v-btn variant="outlined" class="rounded-lg" color="primary" :width="buttonSize" :height="buttonSize" :href="tech.link" target="_blank">
                <v-img :src="tech.icon" :width="buttonSize - 16" :height="buttonSize - 16" />
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </v-col>
      <v-col cols="12" md="6" lg="5">
        <div data-aos="fade-down" class="text-h4 text-primary text-center mb-4">
          Overview
        </div>
        <div class="rounded overflow-hidden d-flex justify-center">
          <script-you-tube-player video-id="8BgjFmTXyM0">
            <template #awaitingLoad>
              <div style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); height: 48px; width: 68px;">
                <v-img src="/img/technologies/youtube.svg" />
              </div>
            </template>
          </script-you-tube-player>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
