<script setup lang="ts">
import { useTheme } from 'vuetify'

// Vuetify 4 widened theme colours from `string` to a union that also covers
// rgb/hsl/hsv objects. Ours are hex strings, and tsparticles wants a string.
const primaryColor = String(useTheme().current.value.colors.primary)
</script>

<template>
  <div class="-mt-16 content-center relative bg-surface min-h-100dvh">
    <nuxt-particles
      id="tsparticles"
      :key="primaryColor"
      class="absolute top-0 left-0 w-full h-full"
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
            value: primaryColor,
          },
          links: {
            color: primaryColor,
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
      <v-row class="justify-center items-center">
        <v-col cols="12" md="6" lg="6" xl="4" class="flex items-center">
          <div class="w-full">
            <animate-in preset="fade-down" class="text-h2 lg:text-h1 text-primary text-center">
              Tilen Pirih
            </animate-in>
            <animate-in preset="fade-right" :delay="0.1" class="text-h4 lg:text-h3 text-center text-secondary">
              Full-stack developer
            </animate-in>
            <animate-in preset="fade-up" :delay="0.2" class="flex justify-center mt-3">
              <v-btn to="#contact" variant="outlined" rounded="xl" class="text-primary bg-blur">
                <div class="rounded bg-success mr-3 greenDot" />
                Available for work
              </v-btn>
            </animate-in>
          </div>
        </v-col>
        <v-col cols="12" md="6" lg="4" xl="3">
          <animate-in preset="flip-up" :delay="0.15">
            <v-img max-width="400" aspect-ratio="1" alt="Profile image" class="border-4 border-solid border-primary border-opacity-30 profile m-auto" src="/img/profile.webp" lazy-src="/img/lazy/profile.webp" />
          </animate-in>
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