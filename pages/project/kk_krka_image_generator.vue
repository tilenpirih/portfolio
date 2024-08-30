<script setup lang="ts">
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
          <!-- <div data-aos="fade-right" class="text-h4 text-lg-h3 text-center text-secondary">
            Full-stack developer
          </div> -->
        </div>
      </v-col>
      <v-col data-aos="flip-up" cols="12" md="6" class="d-flex justify-center">
        <v-img max-width="600" aspect-ratio="1.777" src="/img/krka_social.webp" class="rounded-lg" lazy-src="/img/lazy/krka_social.webp" />
      </v-col>
    </v-row>
  </v-container>
  <div class="bg-surface">
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <div data-aos="fade-down" class="text-h4 text-primary text-center mb-4">
            Technologies
          </div>
          <v-row class="justify-center">
            <v-col v-for="tech in technologies" :key="tech.link" cols="auto">
              <v-btn variant="outlined" color="primary" width="80" height="80" :href="tech.link" target="_blank">
                <v-img :src="tech.icon" width="64" height="64" />
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="6">
          <div data-aos="fade-down" class="text-h4 text-primary text-center mb-4">
            Overview
          </div>
          TODO - video
        </v-col>
      </v-row>
    </v-container>
  </div>
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