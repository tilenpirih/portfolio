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
  <div>
    <!-- Keep this single root element: this component is a page's only child, and
         app.pageTransition wraps pages in <Transition>, which cannot animate a
         fragment. A comment counts as a node too, so it stays inside the root. -->
    <v-container class="py-16">
      <v-row class="justify-center items-center">
        <v-col cols="12" md="6" lg="6" class="flex items-center">
          <div style="width: 100%;">
            <div class="text-h3 lg:text-h2 text-primary text-center">
              <animate-in preset="fade-down">
                {{ project.title }}
              </animate-in>
              <div class="flex gap-2 justify-center">
                <nuxt-link v-if="project.websiteUrl" :to="project.websiteUrl" target="_blank">
                  <animate-in preset="fade-up" :delay="0.1" as-child>
                    <v-btn variant="outlined" class="rounded-full m-auto">
                      <v-icon :icon="mdiWeb" size="large" class="mr-2" />
                      Visit webpage
                    </v-btn>
                  </animate-in>
                </nuxt-link>
                <nuxt-link v-if="project.githubUrl" :to="project.githubUrl" target="_blank">
                  <animate-in preset="fade-up" :delay="0.15" as-child>
                    <v-btn variant="outlined" class="rounded-full m-auto">
                      <v-icon :icon="mdiGithub" size="large" class="mr-2" />
                      Source code
                    </v-btn>
                  </animate-in>
                </nuxt-link>
              </div>
            </div>
          </div>
        </v-col>
        <animate-in preset="flip-up" as-child>
          <v-col cols="12" md="6" class="flex justify-center">
            <nuxt-img
              :src="project.image"
              :alt="project.title"
              :width="600"
              :height="338"
              sizes="xs:100vw sm:600px"
              fetchpriority="high"
              class="w-full max-w-600px h-auto rounded-lg border-4 border-solid border-primary"
            />
          </v-col>
        </animate-in>
      </v-row>
    </v-container>
    <div class="py-5 bg-background">
      <v-container>
        <animate-in preset="fade-down" class="text-h4 text-primary text-center mb-2">
          About
        </animate-in>
        <animate-in preset="fade-up" class="text-center">
          <div v-html="project.description" />
        </animate-in>
      </v-container>
    </div>
    <v-container class="py-9">
      <v-row :class="project.videoId ? 'justify-between' : 'justify-center'">
        <v-col cols="12" md="6" lg="5" class="flex flex-col">
          <animate-in preset="fade-down" class="text-h4 text-primary text-center mb-4">
            Technologies
          </animate-in>
          <animate-in preset="fade-up" class="h-full flex items-center">
            <v-row class="justify-center">
              <animate-in
                v-for="(tech, index) in project.technologies"
                :key="tech.link"
                preset="flip-up"
                :delay="index * 0.05"
                as-child
              >
                <v-col cols="auto">
                  <v-btn variant="outlined" class="rounded-lg" color="primary" :width="buttonSize" :height="buttonSize" :href="tech.link" target="_blank">
                    <v-img :src="tech.icon" aspect-ratio="1" :width="buttonSize - 16" :height="buttonSize - 16" />
                  </v-btn>
                </v-col>
              </animate-in>
            </v-row>
          </animate-in>
        </v-col>
        <v-col v-if="project.videoId" cols="12" md="6" lg="5">
          <animate-in preset="fade-down" class="text-h4 text-primary text-center mb-4">
            Overview
          </animate-in>
          <animate-in preset="fade-up" class="rounded overflow-hidden flex justify-center">
            <script-you-tube-player :video-id="project.videoId">
              <template #awaitingLoad>
                <div style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); height: 48px; width: 68px;">
                  <v-img src="/img/technologies/youtube.svg" />
                </div>
              </template>
            </script-you-tube-player>
          </animate-in>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
