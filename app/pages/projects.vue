<script setup lang="ts">
import bgEraser from '~/data/projects/bgEraser'
import globalEstApplication from '~/data/projects/globalEstApplication'
import globalPdrApplication from '~/data/projects/globalPdrApplication'
import kkKrkaImageGenerator from '~/data/projects/kkKrkaImageGenerator'
import kzs from '~/data/projects/kzs'
import nktolmin from '~/data/projects/nktolmin'
import portfolio from '~/data/projects/portfolio'
import ventic from '~/data/projects/ventic'

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
</script>

<template>
  <div class="pt-3" />
  <div class="bg-background pt-8">
    <div data-aos="fade-down">
      <div class="text-h3 text-primary text-center pb-2">
        Projects
      </div>
      <div class="text-center pb-6">
        Throughout my career, I have worked on a variety of projects, ranging from small personal endeavors to large-scale applications for well-known companies. Here are some of the highlights:
      </div>
    </div>
    <v-container class="py-8">
      <v-row>
        <v-col v-for="(project, index) in projects" :key="index" cols="12" sm="6" lg="4" xl="3">
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