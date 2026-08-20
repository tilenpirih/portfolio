<script setup lang="ts">
import { mdiArrowRight } from '@mdi/js'
import astral8 from '~/data/projects/astral8'
import bgEraser from '~/data/projects/bgEraser'
import chatbot from '~/data/projects/chatbot'
import dvs from '~/data/projects/dvs'
import globalEstApplication from '~/data/projects/globalEstApplication'
import kkKrkaImageGenerator from '~/data/projects/kkKrkaImageGenerator'
import oksVolunteer from '~/data/projects/oksVolunteer'
import ventic from '~/data/projects/ventic'

const projects = [
  ventic,
  astral8,
  chatbot,
  oksVolunteer,
  dvs,
  bgEraser,
  globalEstApplication,
  kkKrkaImageGenerator,
]

const revealAt = [
  '', // 0-2: always
  '',
  '',
  'hidden sm:block', // 4th from sm up
  'hidden lg:block', // 5th-6th from lg up
  'hidden lg:block',
  'hidden xl:block', // 7th-8th from xl up
  'hidden xl:block',
]
</script>

<template>
  <div class="bg-background">
    <v-container class="py-12">
      <animate-in as="h2" preset="fade-down" class="text-h3 text-primary text-center pb-6">
        Projects
      </animate-in>
      <v-row>
        <v-col v-for="(project, index) in projects" :key="index" cols="12" sm="6" lg="4" xl="3" :class="revealAt[index]">
          <nuxt-link :to="project.seo.ogUrl" class="no-underline">
            <animate-in preset="flip-up" :delay="index * 0.07" class="h-full">
              <v-card class="projectCard cursor-pointer rounded-lg h-full">
                <nuxt-img
                  :src="project.image"
                  :alt="project.title"
                  :width="640"
                  :height="360"
                  sizes="xs:100vw sm:50vw lg:33vw xl:25vw"
                  loading="lazy"
                  class="w-full h-auto block"
                />
                <v-card-title tag="h3" class="text-h5 text-primary">
                  {{ project.title }}
                </v-card-title>
                <v-card-text>
                  {{ project.shortText }}
                </v-card-text>
              </v-card>
            </animate-in>
          </nuxt-link>
        </v-col>
      </v-row>
      <div class="flex justify-center mt-8">
        <animate-in preset="fade-up">
          <v-btn to="/projects" :append-icon="mdiArrowRight" variant="outlined" class="rounded-full">
            See all projects
          </v-btn>
        </animate-in>
      </div>
    </v-container>
  </div>
</template>

<style scoped lang="scss">
.projectCard {
  transition: all 0.3s;
}
.projectCard:hover {
  box-shadow: 0 0 4pt 2pt rgb(var(--v-theme-primary));
  scale: 1.03;
  transition: all 0.3s;
}
</style>