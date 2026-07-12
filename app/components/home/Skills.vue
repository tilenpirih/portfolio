<script setup lang="ts">
import { useInView } from 'motion-v'

const skills = [
  { name: 'Vue / Nuxt', level: 9 },
  { name: 'JS / TS', level: 9 },
  { name: 'HTML, CSS / SCSS', level: 8 },
  { name: 'SQL, Postgress, ORMs', level: 8 },
  { name: 'FastApi / Flask', level: 8 },
  { name: 'Git workflow', level: 8 },
  { name: 'Docker', level: 7 },
  { name: 'Linux', level: 7 },
]

// Bars sit at 0 until scrolled to, then fill. v-progress-linear already
// CSS-transitions its width, so changing the value is the whole animation.
const list = useTemplateRef<HTMLElement>('list')
const listInView = useInView(list, { once: true, amount: 0.2 })
</script>

<template>
  <v-container class="py-12">
    <animate-in as="h2" preset="fade-down" class="text-h3 text-primary text-center pb-4">
      Skills
    </animate-in>
    <v-row ref="list">
      <v-col
        v-for="(skill, index) in skills"
        :key="skill.name"
        cols="12"
        md="6"
        class="px-6"
      >
        <animate-in :preset="index % 2 === 0 ? 'fade-right' : 'fade-left'" :delay="index * 0.06">
          <h3 class="text-center text-h5">
            {{ skill.name }}
          </h3>
          <v-progress-linear
            class="mt-1"
            :model-value="listInView ? skill.level : 0"
            max="10"
            :aria-label="skill.name"
            :aria-valuetext="`${skill.level} out of 10`"
          />
        </animate-in>
      </v-col>
    </v-row>
  </v-container>
</template>
