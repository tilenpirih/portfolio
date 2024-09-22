<script setup lang="ts">
import { mdiWeb } from '@mdi/js'
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
    icon: '/img/technologies/ts.svg',
    link: 'https://www.typescriptlang.org/',
  },
  {
    icon: '/img/technologies/openCV.svg',
    link: 'https://opencv.org/',
  },
]
const runtimeConfig = useRuntimeConfig()
useHead({
  title: 'Project Global PDR Application',
  meta: [
    { name: 'description', content: 'Global PDR Application is a web-based platform designed for logging and tracking vehicles, primarily used by car repair shops. Optimized for mobile devices, it also supports Progressive Web App (PWA) functionality, ensuring flexibility and easy customization for specific company needs.' },
    { property: 'og:title', content: 'Project Global PDR Application' },
    { property: 'og:image', content: `${runtimeConfig.public.BASE_URL}/img/globalPDR.webp` },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `${runtimeConfig.public.BASE_URL}/project/global_pdr_application` },
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
              Global EST Application
            </div>
            <nuxt-link to="https://globalpdr.org/">
              <v-btn data-aos="fade-up" variant="outlined" class="rounded-pill m-auto">
                <v-icon :icon="mdiWeb" size="large" class="mr-2" />
                Visit webpage
              </v-btn>
            </nuxt-link>
          </div>
        </div>
      </v-col>
      <v-col data-aos="flip-up" cols="12" md="6" class="d-flex justify-center">
        <v-img max-width="600" aspect-ratio="1.7778" src="/img/globalEST.webp" class="rounded-lg border-lg border-primary" lazy-src="/img/lazy/globalEST.webp" />
      </v-col>
    </v-row>
  </v-container>
  <div class="bg-surface py-5">
    <v-container>
      <div data-aos="fade-down" class="text-h4 text-primary text-center mb-2">
        About
      </div>
      <div data-aos="fade-up" class="text-center">
        This project allows users to create a car damage report. Users can select car parts and for images it can automatically gather images from a tunnel cameras with RTSP protocol.
        After all the data is inserted it generates a PDF report and with one click of a button it sends the report to the insurance company.
      </div>
    </v-container>
  </div>

  <v-container class="py-9">
    <v-row class="justify-space-between">
      <v-col cols="12" md="6" lg="5" class="d-flex flex-column">
        <div data-aos="fade-down" class="text-h4 text-primary text-center mb-4">
          Technologies
        </div>
        <div data-aos="fade-up" class="h-100 d-flex align-center">
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
        <div data-aos="fade-up" class="rounded overflow-hidden d-flex justify-center">
          <script-you-tube-player video-id="fK418gdwDRk">
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
