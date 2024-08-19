<script setup lang="ts">
import { mdiThemeLightDark } from '@mdi/js'

const hasScrolled = ref(false)

function onScroll() {
  hasScrolled.value = window.scrollY > 8
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <div>
    <v-app-bar app elevation="0" height="64">
      <div class="innerContainer d-flex align-center justify-space-between px-3" :class="{ scrolled: hasScrolled }">
        <div>
          asdf
        </div>
        <div>
          <v-btn rounded="xl">
            About
          </v-btn>
          <v-btn rounded="xl" class="mx-1">
            Skills
          </v-btn>
          <v-btn rounded="xl">
            Projects
          </v-btn>
        </div>
        <div>
          <change-theme />
        </div>
      </div>
    </v-app-bar>
  </div>
</template>

<style scoped lang="scss">
:deep(.v-toolbar) {
  background: transparent !important;
}
.innerContainer {
  width: 100%;
  margin: 16px;
  margin-bottom: 0px;
  border-radius: 100px;
  height: 48px;
  border: solid 2px transparent;
  transition: 0.3s ease;
}
.scrolled {
  border: solid 2px rgb(var(--v-theme-primary), 0.5);
  backdrop-filter: blur(10px);
  background-color: rgb(var(--v-theme-background), 0.5);
}
</style>