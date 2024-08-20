<script setup lang="ts">

</script>

<template>
  <v-container>
    <v-row class="justify-center align-center">
      <v-col cols="12" sm="6" lg="6" xl="4" class="d-flex align-center">
        <div style="width: 100%;">
          <div data-aos="fade-left" class="text-h2 text-lg-h1  text-primary text-center">
            Tilen Pirih
          </div>
          <div data-aos="fade-right" class="text-h4 text-lg-h3  text-center text-secondary">
            Fullstack developer
          </div>
        </div>
      </v-col>
      <v-col data-aos="flip-up" cols="12" sm="6" lg="4" xl="3">
        <v-img style="border-radius: 50%;" aspect-ratio="1" class="border-lg border-primary" src="/img/profile.webp" lazy-src="/img/lazy/profile.webp" />
      </v-col>
    </v-row>
  </v-container>
  <div class="bg-surface mt-8">
    <v-container>
      <div data-aos="fade-down" class="text-h3 text-primary text-center mb-2">
        About
      </div>
      <div data-aos="fade-up" class="text-center">
        My name is Tilen Pirih, and I'm a passionate Fullstack Developer from Slovenia.
        With a strong focus on frontend development, I specialize in building dynamic and responsive applications using Vue.js and Nuxt.js.
        I thrive on new challenges and am constantly seeking to expand my skillset by exploring and mastering new technologies.
        Whether it's crafting seamless user interfaces or optimizing backend processes, I'm always eager to contribute and grow as a developer.
      </div>
    </v-container>
  </div>
  <div style="height: 500px;">
    <h1>Skills</h1>
  </div>
  <div data-aos="fade-up" style="height: 500px;">
    <h1>Projects</h1>
  </div>
</template>

<style scoped>

</style>