<script setup lang="ts">
import { useTheme } from 'vuetify'

// Vuetify 4 widened theme colours from `string` to a union that also covers
// rgb/hsl/hsv objects. Ours are hex strings, and tsparticles wants a string.
const primaryColor = String(useTheme().current.value.colors.primary)

// tsparticles is ~80kB of decoration sitting on top of the hero. Loaded eagerly
// it competes with the stylesheet for bandwidth and pushes out first paint, so
// it waits for an idle frame. `Lazy` keeps it out of the initial chunk graph;
// the canvas is absolutely positioned, so arriving late shifts nothing.
const showParticles = ref(false)
onMounted(() => {
  const whenIdle = window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 200))
  whenIdle(() => (showParticles.value = true))
})
</script>

<template>
  <div class="-mt-16 content-center relative bg-surface min-h-100dvh">
    <lazy-nuxt-particles
      v-if="showParticles"
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
            <animate-in as="h1" immediate preset="fade-down" class="text-h2 lg:text-h1 text-primary text-center">
              Tilen Pirih
            </animate-in>
            <animate-in as="p" immediate preset="fade-right" :delay="0.1" class="text-h4 lg:text-h3 text-center text-secondary">
              Full-stack developer
            </animate-in>
            <animate-in immediate preset="fade-up" :delay="0.2" class="flex justify-center mt-3">
              <v-btn to="#contact" variant="outlined" rounded="xl" class="text-primary bg-blur">
                <div class="rounded bg-success mr-3 greenDot" />
                Available for work
              </v-btn>
            </animate-in>
          </div>
        </v-col>
        <v-col cols="12" md="6" lg="4" xl="3">
          <!-- slide, not fade: this image is the LCP element, and Chrome won't
               settle an LCP candidate while it's still fading — an opacity
               entrance here cost ~0.7s of LCP. A transform-only animation keeps
               the element opaque the whole way in, so it costs nothing. -->
          <animate-in immediate preset="slide-left" :delay="0.15">
            <nuxt-img
              src="/img/profile.webp"
              alt="Profile image"
              :width="400"
              :height="400"
              sizes="xs:100vw sm:400px"
              fetchpriority="high"
              :preload="{ fetchPriority: 'high' }"
              class="w-full max-w-400px h-auto border-4 border-solid border-primary border-opacity-30 profile m-auto block"
            />
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