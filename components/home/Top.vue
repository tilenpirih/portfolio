<script setup lang="ts">
import { useGoTo, useTheme } from 'vuetify'

const goTo = useGoTo()
const defaultTheme = useTheme().themes.value.defaultTheme
</script>

<template>
  <div class="mainContainer mt-n16">
    <nuxt-particles
      id="tsparticles"
      :key="defaultTheme.dark.toString()"
      class="particle-container"
      :options="{
        fullScreen: {
          enable: false,
          zIndex: -1,
        },
        fpsLimit: 60,
        detectRetina: true,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: 'repulse',
            },
          },
          modes: {
            bubble: {
              distance: 400,
              duration: 2,
              opacity: 0.8,
              size: 40,
            },
            repulse: {
              distance: 100,
              duration: 0.4,
            },
          },
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
            speed: 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
            },
            value: 150,
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
    />
    <v-container class="pt-16">
      <v-row class="justify-center align-center">
        <v-col cols="12" md="6" lg="6" xl="4" class="d-flex align-center">
          <div class="w-100">
            <div data-aos="fade-down" class="text-h2 text-lg-h1 text-primary text-center">
              Tilen Pirih
            </div>
            <div data-aos="fade-right" class="text-h4 text-lg-h3 text-center text-secondary">
              Full-stack developer
            </div>
            <div class="d-flex justify-center mt-3">
              <v-btn data-aos="fade-up" variant="outlined" rounded="xl" class="text-primary bg-blur" @click="goTo(`#contact`, { offset: -80 })">
                <div class="rounded bg-success mr-3 greenDot" />
                Available for work
              </v-btn>
            </div>
          </div>
        </v-col>
        <v-col data-aos="flip-up" cols="12" md="6" lg="4" xl="3" class="d-flex justify-center">
          <v-img max-width="400" aspect-ratio="1" class="border-lg border-primary profile" src="/img/profile.webp" lazy-src="/img/lazy/profile.webp" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped lang="scss">
@keyframes pulsate {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.mainContainer {
  min-height: 100vh;
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

.greenDot {
  width: 8px;
  height: 8px;
  animation: pulsate 2s infinite;
}

.profile {
  border-radius: 50%;
}
</style>