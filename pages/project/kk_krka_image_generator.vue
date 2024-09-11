<script setup lang="ts">
import { useDisplay } from 'vuetify'

const display = useDisplay()

const buttonSize = ref(100)
watch(() => display.mobile.value, value => {
  buttonSize.value = value ? 80 : 100
})

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
  {
    icon: '/img/technologies/ts.svg',
    link: 'https://www.typescriptlang.org/',
  },
]
const runtimeConfig = useRuntimeConfig()
useHead({
  title: 'Project KK Krka - Image generator',
  meta: [
    { name: 'description', content: 'This project is designed for the Krka Basketball Club, making it easy to quickly generate images for social media. Users can create and save customizable templates that can be modified with ease. The platform allows for personalized image and text customization, enhancing flexibility. Additionally, it includes a built-in background removal tool, which is especially handy for removing backgrounds on mobile devices or when you\'re looking to save time.' },
    { property: 'og:title', content: 'Project KK Krka - Image generator' },
    { property: 'og:image', content: `${runtimeConfig.public.BASE_URL}/img/krka_social.webp` },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `${runtimeConfig.public.BASE_URL}/project/kk_krka_image_generator` },
  ],
})
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
        This project is designed for the Krka Basketball Club, making it easy to quickly generate images for social media.
        Users can create and save customizable templates that can be modified with ease.
        The platform allows for personalized image and text customization, enhancing flexibility.
        Additionally, it includes a built-in background removal tool, which is especially handy for removing backgrounds on mobile devices or when you're looking to save time.
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
