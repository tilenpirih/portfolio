<script setup lang="ts">
const hasScrolled = ref(false)

function onScroll() {
  hasScrolled.value = window.scrollY > 8
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
  onScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <div>
    <div class="outerContainer px-4 pt-4">
      <client-only>
        <div class="innerContainer d-flex align-center justify-space-between px-3" :class="{ scrolled: hasScrolled }">
          <div style="width: 40px;">
            <!-- as -->
          </div>
          <div>
            <v-btn variant="text" rounded="xl">
              About
            </v-btn>
            <v-btn variant="text" rounded="xl" class="mx-1">
              Skills
            </v-btn>
            <v-btn variant="text" rounded="xl">
              Projects
            </v-btn>
            <v-btn variant="text" rounded="xl">
              Contact
            </v-btn>
          </div>
          <div>
            <change-theme />
          </div>
        </div>
      </client-only>
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep(.v-toolbar) {
  background: transparent !important;
}
.outerContainer {
  position: fixed;
  width: 100%;
  z-index: 1000;
}
.innerContainer {
  width: 100%;
  // margin: 16px;
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