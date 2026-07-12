<script setup lang="ts">
import { mdiOpenInNew } from '@mdi/js'
</script>

<template>
  <div class="bg-background">
    <v-container class="py-12 text-center flex justify-center">
      <div>
        <animate-in as="h2" preset="fade-down" class="text-h3 text-primary pb-4">
          About
        </animate-in>
        <div style="max-width: 1200px;">
          <animate-in preset="fade-down">
            My name is Tilen Pirih, and I'm a passionate Fullstack Developer from Slovenia. As a self-employed developer,
            I have the freedom to take on diverse projects and tailor my work to the specific needs of my clients.
            With a strong focus on frontend development, I specialize in building dynamic and responsive applications using Vue.js and Nuxt.js.
            I thrive on new challenges and am constantly seeking to expand my skillset by exploring and mastering new technologies.
            Whether it's crafting seamless user interfaces or optimizing backend processes, I'm always eager to contribute and grow as a developer.
          </animate-in>
          <animate-in preset="fade-up" class="mt-3">
            <v-btn
              variant="outlined"
              class="rounded-full"
              href="/resume_Tilen_Pirih.pdf"
              target="_blank"
              rel="noopener"
              aria-label="See my resume (opens a PDF in a new tab)"
            >
              See my resume
              <v-icon :icon="mdiOpenInNew" size="large" class="ml-2" aria-hidden="true" />
            </v-btn>
          </animate-in>
        </div>
      </div>
    </v-container>
  </div>
</template>