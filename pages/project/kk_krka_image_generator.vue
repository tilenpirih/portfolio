<script setup lang="ts">
import { useDisplay } from 'vuetify'

const display = useDisplay()
const buttonSize = computed(() => display.mobile.value ? 80 : 100)
const technologies = [
  {
    icon: '/img/technologies/nuxt.svg',
    link: 'https://nuxtjs.org/',
  },
  {
    icon: '/img/technologies/vuetify.svg',
    link: 'https://vuetifyjs.com/',
  },
  {
    icon: '/img/technologies/pinia.svg',
    link: 'https://pinia.vuejs.org/',
  },
  {
    icon: '/img/technologies/bun.svg',
    link: 'https://bun.sh/',
  },
  {
    icon: '/img/technologies/fastapi.svg',
    link: 'https://fastapi.tiangolo.com/',
  },
  {
    icon: '/img/technologies/postgresql.svg',
    link: 'https://www.postgresql.org/',
  },
  {
    icon: '/img/technologies/docker.svg',
    link: 'https://www.docker.com/',
  },
  {
    icon: '/img/technologies/advancedCropper.svg',
    link: 'https://advanced-cropper.github.io/vue-advanced-cropper/',
  },
]
</script>

<template>
  <v-container class="py-16">
    <v-row class="justify-center align-center">
      <v-col cols="12" md="6" lg="6" class="d-flex align-center">
        <div style="width: 100%;">
          <div data-aos="fade-down" class="text-h3 text-lg-h2 text-primary text-center">
            KK Krka - Image generator
          </div>
        </div>
      </v-col>
      <v-col data-aos="flip-up" cols="12" md="6" class="d-flex justify-center">
        <v-img max-width="600" aspect-ratio="1.777" src="/img/krka_social.webp" class="rounded-lg" lazy-src="/img/lazy/krka_social.webp" />
      </v-col>
    </v-row>
  </v-container>
  <div class="bg-surface py-5">
    <v-container>
      <div data-aos="fade-down" class="text-h4 text-primary text-center mb-2">
        About
      </div>
      <div class="text-center">
        This project is for basketall club Krka. It is used to generate images for social media quickly and easily. That allows them to generate images also while match is still ongoing just on their phones.
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
          <script-you-tube-player video-id="jbXCaaKe8t4">
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

<style scoped lang=scss>
// :deep(.v-tooltip) {
//   background-color: red;
//   > div {
//     background-color: rgb(var(--v-theme-primary)) !important;
//     color: white;
//     border-radius: 8px;
//   }
// }
// :deep(){
//   .v-tooltip {
//     background-color: red !important;
//     > div {
//       background-color: rgb(var(--v-theme-primary)) !important;
//       color: white;
//       border-radius: 8px;
//     }
//   }
// }
</style>