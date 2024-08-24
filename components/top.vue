<script setup lang="ts">
import type { Container } from '@tsparticles/engine'
import { useTheme } from 'vuetify'

const defaultTheme = useTheme().themes.value.defaultTheme

function onLoad(container: Container) {
  container.pause()
  setTimeout(() => container.play(), 2000)
}
</script>

<template>
  <div class="mainContainer mt-n16">
    <nuxt-particles
      class="particle-container"
      id="tsparticles"
      :key="defaultTheme.dark"
      :options="{
        fullScreen: {
          enable: false,
          zIndex: -1,
        },
        particles: {
          color: {
            value: defaultTheme.colors.primary,
          },
          links: {
            color: defaultTheme.colors.primary,
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          move: {
            direction: 'none',
            enable: true,
            outModes: 'bounce',
            random: false,
            speed: 3,
            straight: false,
          },
          number: {
            density: {
              enable: true,
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: 'circle',
          },
          size: {
            value: { min: 1, max: 5 },
          },
        },
      }"
      @load="onLoad"
    />
    <v-container class="pt-16">
      <!-- Content -->
      <v-row class="justify-center align-center">
        <v-col cols="12" sm="6" lg="6" xl="4" class="d-flex align-center">
          <div style="width: 100%;">
            <div data-aos="fade-left" class="text-h2 text-lg-h1  text-primary text-center">
              Tilen Pirih
            </div>
            <div data-aos="fade-right" class="text-h4 text-lg-h3  text-center text-secondary">
              Full-stack developer
            </div>
          </div>
        </v-col>
        <v-col data-aos="flip-up" cols="12" sm="6" lg="4" xl="3">
          <v-img style="border-radius: 50%;" aspect-ratio="1" class="border-lg border-primary" src="/img/profile.webp" lazy-src="/img/lazy/profile.webp" />
        </v-col>
      </v-row>
    </v-container>
  </div>

  <div>Here particles shouldn't be visible</div>
</template>

<style scoped lang="scss">
.mainContainer {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.particle-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.nuxt-particles {
  width: 100%;
  height: 100%;
}

// #tsparticles {
//   canvas {
//     border: solid 1px red;
//   }
// }
</style>