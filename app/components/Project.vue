<script setup lang="ts">
import type { ProjectData } from '~/types/main'
import { mdiGithub, mdiWeb } from '@mdi/js'
import { useDisplay } from 'vuetify'

const { project } = defineProps<{ project: ProjectData }>()
const display = useDisplay()
const buttonSize = ref(100)
watch(() => display.mobile.value, value => {
  buttonSize.value = value ? 80 : 100
})
</script>

<template>
  <v-container class="py-16">
    <v-row class="justify-center align-center">
      <v-col cols="12" md="6" lg="6" class="d-flex align-center">
        <div style="width: 100%;">
          <div class="text-h3 text-lg-h2 text-primary text-center">
            <div data-aos="fade-down">
              {{ project.title }}
            </div>
            <div class="d-flex ga-2 justify-center">
              <nuxt-link v-if="project.websiteUrl" :to="project.websiteUrl" target="_blank">
                <v-btn data-aos="fade-up" variant="outlined" class="rounded-pill m-auto">
                  <v-icon :icon="mdiWeb" size="large" class="mr-2" />
                  Visit webpage
                </v-btn>
              </nuxt-link>
              <nuxt-link v-if="project.githubUrl" :to="project.githubUrl" target="_blank">
                <v-btn data-aos="fade-up" variant="outlined" class="rounded-pill m-auto">
                  <v-icon :icon="mdiGithub" size="large" class="mr-2" />
                  Source code
                </v-btn>
              </nuxt-link>
            </div>
          </div>
        </div>
      </v-col>
      <v-col data-aos="flip-up" cols="12" md="6" class="d-flex justify-center">
        <v-img max-width="600" aspect-ratio="1.7778" :src="project.image" class="rounded-lg border-lg border-primary" :lazy-src="project.lazyImage" />
      </v-col>
    </v-row>
  </v-container>
  <div class="bg-surface py-5">
    <v-container>
      <div data-aos="fade-down" class="text-h4 text-primary text-center mb-2">
        About
      </div>
      <div data-aos="fade-up" class="text-center">
        <div v-html="project.description" />
      </div>
    </v-container>
  </div>

  <v-container class="py-9">
    <v-row :class="{ 'justify-space-between': project.videoId, 'justify-center': !project.videoId }">
      <v-col cols="12" md="6" lg="5" class="d-flex flex-column">
        <div data-aos="fade-down" class="text-h4 text-primary text-center mb-4">
          Technologies
        </div>
        <div data-aos="fade-up" class="h-100 d-flex align-center">
          <v-row class="justify-center">
            <v-col v-for="tech in project.technologies" :key="tech.link" cols="auto">
              <v-btn variant="outlined" class="rounded-lg" color="primary" :width="buttonSize" :height="buttonSize" :href="tech.link" target="_blank">
                <v-img :src="tech.icon" aspect-ratio="1" :width="buttonSize - 16" :height="buttonSize - 16" />
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </v-col>
      <v-col v-if="project.videoId" cols="12" md="6" lg="5">
        <div data-aos="fade-down" class="text-h4 text-primary text-center mb-4">
          Overview
        </div>
        <div data-aos="fade-up" class="rounded overflow-hidden d-flex justify-center">
          <script-you-tube-player :video-id="project.videoId">
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
