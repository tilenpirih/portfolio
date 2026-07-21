<script setup lang="ts">
import astral8 from '~/data/projects/astral8'
import bgEraser from '~/data/projects/bgEraser'
import chatbot from '~/data/projects/chatbot'
import dvs from '~/data/projects/dvs'
import globalEstApplication from '~/data/projects/globalEstApplication'
import globalPdrApplication from '~/data/projects/globalPdrApplication'
import kkKrkaImageGenerator from '~/data/projects/kkKrkaImageGenerator'
import kzs from '~/data/projects/kzs'
import nktolmin from '~/data/projects/nktolmin'
import oksVolunteer from '~/data/projects/oksVolunteer'
import portfolio from '~/data/projects/portfolio'
import ventic from '~/data/projects/ventic'

const projects = [
  astral8,
  chatbot,
  oksVolunteer,
  dvs,
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
  <div class="pt-3">
    <!-- Keep this single root element: app.pageTransition wraps pages in
         <Transition>, which cannot animate a fragment. -->
    <div class="bg-background pt-8">
      <animate-in preset="fade-down">
        <h1 class="text-h3 text-primary text-center pb-2">
          Projects
        </h1>
        <div class="text-center pb-6">
          Throughout my career, I have worked on a variety of projects, ranging from small personal endeavors to large-scale applications for well-known companies.
        </div>
      </animate-in>
      <v-container class="py-8">
        <v-row>
          <v-col v-for="(project, index) in projects" :key="index" cols="12" sm="6" lg="4" xl="3">
            <nuxt-link :to="project.seo.ogUrl" class="no-underline">
              <animate-in preset="flip-up" :delay="(index % 4) * 0.07" class="h-full">
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
                  <v-card-title tag="h2" class="text-h5 text-primary">
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
      </v-container>
    </div>
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