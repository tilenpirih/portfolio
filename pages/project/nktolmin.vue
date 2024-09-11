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
    icon: '/img/technologies/vuetify.svg',
    link: 'https://vuetifyjs.com/',
  },
  {
    icon: '/img/technologies/vuex.svg',
    link: 'https://vuex.vuejs.org/',
  },
  {
    icon: '/img/technologies/js.svg',
    link: 'https://www.w3schools.com/js/',
  },
  {
    icon: '/img/technologies/nodejs.svg',
    link: 'https://nodejs.org/en',
  },
  {
    icon: '/img/technologies/flask.svg',
    link: 'https://flask.palletsprojects.com/',
  },
  {
    icon: '/img/technologies/docker.svg',
    link: 'https://www.docker.com/',
  },
  {
    icon: '/img/technologies/peewee.webp',
    link: 'https://docs.peewee-orm.com/',
  },
  {
    icon: '/img/technologies/beautifulSoup.png',
    link: 'https://beautiful-soup-4.readthedocs.io/',
  },
]

const runtimeConfig = useRuntimeConfig()
useHead({
  title: 'Project NK Tolmin',
  meta: [
    { name: 'description', content: 'This project was particularly meaningful to me because it involved revamping the website of my local football club, where I had played for 10 years. My goal was to make it easier for the club to manage their online presence, so I developed a web scraper that automatically pulled relevant public data and displayed it seamlessly on the website.' },
    { property: 'og:title', content: 'Project NK Tolmin' },
    { property: 'og:image', content: `${runtimeConfig.public.BASE_URL}/img/nktolmin.webp` },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `${runtimeConfig.public.BASE_URL}/project/nktolmin` },
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
              NK Tolmin
            </div>
            <nuxt-link to="https://github.com/tilenpirih?tab=repositories&q=nk-tolmin&type=&language=&sort=">
              <v-btn data-aos="fade-up" variant="outlined" class="rounded-pill m-auto">
                <v-icon :icon="mdiGithub" size="large" class="mr-2" />
                Source code
              </v-btn>
            </nuxt-link>
          </div>
        </div>
      </v-col>
      <v-col data-aos="flip-up" cols="12" md="6" class="d-flex justify-center">
        <v-img max-width="600" aspect-ratio="1.778" src="/img/nktolmin.webp" class="rounded-lg border-lg border-primary" lazy-src="/img/lazy/nktolmin.webp" />
      </v-col>
    </v-row>
  </v-container>
  <div class="bg-surface py-5">
    <v-container>
      <div data-aos="fade-down" class="text-h4 text-primary text-center mb-2">
        About
      </div>
      <div data-aos="fade-up" class="text-center">
        This project was particularly meaningful to me because it involved revamping the website of my local football club, where I had played for 10 years.
        Additionally, I saw an opportunity to incorporate this work into my college
        <nuxt-link to="https://repozitorij.uni-lj.si/IzpisGradiva.php?id=145003&lang=slv" target="_blank">
          <span>thesis</span>
        </nuxt-link>.
        My goal was to make it easier for the club to manage their online presence, so I developed a web scraper that automatically pulled relevant public data and displayed it seamlessly on the website.
        <br>
        Unfortunately, the project had to be abandoned. The club chose not to compensate me adequately, and without proper pay, I lacked the time and motivation to continue working and maintaining the project.
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
          <script-you-tube-player video-id="_NxHsBEe0xY">
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
