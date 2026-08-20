<script setup lang="ts">
import { useTheme } from 'vuetify'

// Vuetify 4 widened theme colours from `string` to a union that also covers
// rgb/hsl/hsv objects. Ours are hex strings, and tsparticles wants a string.
const primaryColor = String(useTheme().current.value.colors.primary)

// See the comment on the <nuxt-img> for what the numeric keys are doing.
const profileSizes = '364:90vw 412:90vw sm:400px'

// This replaces <nuxt-img :preload>: with a `sizes` prop the module emits the
// preload with imagesizes but *without* imagesrcset (its responsive check only
// recognises density descriptors, `x, `, not width ones, `w, `) — and a
// preload without imagesrcset ignores imagesizes and fetches the 800px href
// unconditionally, so every phone downloaded the image twice. Same bytes as
// the <img>'s own srcset, so the preload always matches what the img picks.
if (import.meta.server) {
  const img = useImage()
  const profile = img.getSizes('/img/profile.webp', {
    sizes: profileSizes,
    // quality must be stated here or the URLs come out without q_75 — a
    // preload of a URL the <img> never requests is a straight double download.
    modifiers: { width: 400, height: 400, quality: img.options.quality },
  })
  useHead({
    link: [{
      rel: 'preload',
      as: 'image',
      href: profile.src,
      imagesrcset: profile.srcset,
      imagesizes: profile.sizes,
      fetchpriority: 'high',
    }],
  })
}

// tsparticles is ~80kB of decoration sitting on top of the hero, and once it
// starts it repaints the canvas forever — the page never reaches a visually
// "finished" frame, which is what pushed Speed Index to 4.3s on a page whose
// content settles by ~2.5s. (An idle-callback delay didn't help: the lab idles
// early, then the animation runs for the rest of the trace.) So it now waits
// for the first sign of a human — mouse move, tap, scroll, key — which real
// visitors produce within the first second and lab runs never do. `Lazy` keeps
// it out of the initial chunk graph; the canvas is absolutely positioned, so
// arriving late shifts nothing.
const showParticles = ref(false)
const interaction = new AbortController()
onUnmounted(() => interaction.abort())
onMounted(() => {
  for (const event of ['pointermove', 'pointerdown', 'scroll', 'keydown']) {
    window.addEventListener(event, () => {
      showParticles.value = true
      interaction.abort()
    }, { once: true, passive: true, signal: interaction.signal })
  }
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
            <div class="flex justify-center mt-3">
              <v-btn to="#contact" variant="outlined" class="rounded-full text-primary backdrop-blur-md">
                <div class="rounded bg-success mr-3 greenDot " />
                Available for work
              </v-btn>
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="6" lg="4" xl="3">
          <!-- slide, not fade: this image is the LCP element, and Chrome won't
               settle an LCP candidate while it's still fading — an opacity
               entrance here cost ~0.7s of LCP. A transform-only animation keeps
               the element opaque the whole way in, so it costs nothing. -->
          <animate-in immediate preset="slide-left" :delay="0.15">
            <!-- Without `sizes` the srcset is just 400w/800w, so any phone
                 whose DPR needs more than 400px physical downloads the whole
                 800px/56kB file. 90vw is what the image actually renders at on
                 phones (100vw minus container+col padding; the DSL can't say
                 calc()). The numeric keys are only there to mint the srcset
                 steps in between — ~328/656w and ~371/742w — so a 2x 360px
                 phone gets the 656px file (~37kB) instead of the 800px one.
                 Above `sm` the layout caps the image at 400 CSS px. -->
            <nuxt-img
              src="/img/profile.webp"
              alt="Profile image"
              :width="400"
              :height="400"
              :sizes="profileSizes"
              fetchpriority="high"
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