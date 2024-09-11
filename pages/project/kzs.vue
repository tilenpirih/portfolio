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
    icon: '/img/technologies/vue.svg',
    link: 'https://vuejs.org/',
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
    icon: '/img/technologies/yarn.svg',
    link: 'https://yarnpkg.com/',
  },
  {
    icon: '/img/technologies/tailwind.svg',
    link: 'https://tailwindcss.com/',
  },
  {
    icon: '/img/technologies/bootstrapVue.svg',
    link: 'https://bootstrap-vue.org/',
  },
]
const runtimeConfig = useRuntimeConfig()
useHead({
  title: 'Project KZS',
  meta: [
    { name: 'description', content: 'I contributed to the development of the new website for the Slovenian Basketball Federation, working in collaboration with Onixweb d.o.o. I joined the project during its mid-development stage and actively participated in its progress for six months.' },
    { property: 'og:title', content: 'Project KZS' },
    { property: 'og:image', content: `${runtimeConfig.public.BASE_URL}/img/kzs.webp` },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `${runtimeConfig.public.BASE_URL}/project/kzs` },
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
              Košarkaška zveza Slovenije
            </div>
            <nuxt-link to="https://kzs.si">
              <v-btn data-aos="fade-up" variant="outlined" class="rounded-pill m-auto">
                <v-icon :icon="mdiWeb" size="large" class="mr-2" />
                Visit page
              </v-btn>
            </nuxt-link>
          </div>
        </div>
      </v-col>
      <v-col data-aos="flip-up" cols="12" md="6" class="d-flex justify-center">
        <v-img max-width="600" aspect-ratio="1.778" src="/img/kzs.webp" class="rounded-lg" lazy-src="/img/lazy/kzs.webp" />
      </v-col>
    </v-row>
  </v-container>
  <div class="bg-surface py-5">
    <v-container>
      <div data-aos="fade-down" class="text-h4 text-primary text-center mb-2">
        About
      </div>
      <div class="text-center">
        I contributed to the development of the new website for the Slovenian Basketball Federation, working in collaboration with Onixweb d.o.o. I joined the project during its mid-development stage and actively participated in its progress for six months.
        <br>
        Additionally, we adapted the design for the Slovenian Volleyball Federation and Paravolley Europe.
      </div>
    </v-container>
  </div>

  <v-container class="py-9">
    <v-row class="justify-space-between">
      <v-col cols="12" class="d-flex flex-column">
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
    </v-row>
  </v-container>
</template>
