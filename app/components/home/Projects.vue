<script setup lang="ts">
import { mdiArrowRight } from '@mdi/js'
import { useDisplay } from 'vuetify'
import bgEraser from '~/data/projects/bgEraser'
import globalEstApplication from '~/data/projects/globalEstApplication'
import globalPdrApplication from '~/data/projects/globalPdrApplication'
import kkKrkaImageGenerator from '~/data/projects/kkKrkaImageGenerator'
import kzs from '~/data/projects/kzs'
import nktolmin from '~/data/projects/nktolmin'
import portfolio from '~/data/projects/portfolio'
import ventic from '~/data/projects/ventic'

const { mdAndDown, lgAndDown, xs } = useDisplay()

const projects = [
  bgEraser,
  globalEstApplication,
  kkKrkaImageGenerator,
  portfolio,
  globalPdrApplication,
  kzs,
  ventic,
  nktolmin,
]

const listProjects = computed(() => {
  if (xs.value)
    return projects.slice(0, 3)
  if (mdAndDown.value)
    return projects.slice(0, 4)
  if (lgAndDown.value)
    return projects.slice(0, 6)
  return projects
})
</script>

<template>
  <div class="bg-background">
    <v-container class="py-12">
      <div data-aos="fade-down">
        <div class="text-h3 text-primary text-center pb-6">
          Projects
        </div>
      </div>
      <v-row>
        <v-col v-for="(project, index) in listProjects" :key="index" cols="12" sm="6" lg="4" xl="3">
          <nuxt-link :to="project.seo.ogUrl" class="text-decoration-none">
            <div data-aos="flip-up" style="height: 100%;">
              <v-card class="projectCard cursor-pointer h-100 rounded-lg h-full">
                <v-img :src="project.image" :lazy-src="project.lazyImage" aspect-ratio="1.777" />
                <v-card-title class="text-h5 text-primary">
                  {{ project.title }}
                </v-card-title>
                <v-card-text>
                  {{ project.shortText }}
                </v-card-text>
              </v-card>
            </div>
          </nuxt-link>
        </v-col>
      </v-row>
      <div class="d-flex justify-center mt-8">
        <div data-aos="fade-up">
          <nuxt-link to="/projects">
            <v-btn :append-icon="mdiArrowRight" variant="outlined" class="rounded-pill">
              See all projects
            </v-btn>
          </nuxt-link>
        </div>
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