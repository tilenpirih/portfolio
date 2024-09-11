<script setup lang="ts">
import { mdiOpenInNew } from '@mdi/js'
</script>

<template>
  <div id="about" class="bg-surface">
    <v-container class="py-12 text-center">
      <div>
        <div data-aos="fade-down" class="text-h3 text-primary pb-4">
          About
        </div>
        <div class="d-flex justify-center" style="max-width: 1200px;">
          <div >
            <div data-aos="fade-down">
              My name is Tilen Pirih, and I'm a passionate Fullstack Developer from Slovenia. As a self-employed developer,
              I have the freedom to take on diverse projects and tailor my work to the specific needs of my clients.
              With a strong focus on frontend development, I specialize in building dynamic and responsive applications using Vue.js and Nuxt.js.
              I thrive on new challenges and am constantly seeking to expand my skillset by exploring and mastering new technologies.
              Whether it's crafting seamless user interfaces or optimizing backend processes, I'm always eager to contribute and grow as a developer.
            </div>
            <div data-aos="fade-up" class="mt-3">
              <nuxt-link to="/CV_Tilen_Pirih.pdf" target="_blank">
                <v-btn variant="outlined" class="rounded-pill">
                  See my resume
                  <v-icon :icon="mdiOpenInNew" size="large" class="ml-2" />
                </v-btn>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<style scoped>

</style>