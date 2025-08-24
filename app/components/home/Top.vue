<script setup lang="ts">
import { useGoTo, useTheme } from 'vuetify'

const goTo = useGoTo()
// const defaultTheme = useTheme().themes.value.defaultTheme
</script>

<template>
  <div class="mainContainer mt-n16">
    <v-container class="pt-16">
      <v-row class="justify-center align-center">
        <v-col cols="12" md="6" lg="6" xl="4" class="d-flex align-center">
          <div class="w-100">
            <div data-aos="fade-down">
              <div class="text-h2 text-lg-h1 text-primary text-center">
                Tilen Pirih
              </div>
            </div>
            <div data-aos="fade-right">
              <div class="text-h4 text-lg-h3 text-center text-secondary">
                Full-stack developer
              </div>
            </div>
            <div data-aos="fade-up">
              <div class="d-flex justify-center mt-3">
                <v-btn variant="outlined" rounded="xl" class="text-primary bg-blur" @click="goTo(`#contact`, { offset: -80 })">
                  <div class="rounded bg-success mr-3 greenDot" />
                  Available for work
                </v-btn>
              </div>
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="6" lg="4" xl="3">
          <div data-aos="flip-up">
            <v-img max-width="400" aspect-ratio="1" alt="Profile image" class="border-lg border-primary profile ma-auto" src="/img/profile.webp" lazy-src="/img/lazy/profile.webp" />
          </div>
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