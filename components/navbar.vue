<script setup lang="ts">
import { mdiMenu } from '@mdi/js'
import { useGoTo } from 'vuetify'

const goTo = useGoTo()
const hasScrolled = ref(false)
const drawer = ref(false)
const tabs = ref([
  { title: 'About', to: '#about' },
  { title: 'Skills', to: '#skills' },
  { title: 'Projects', to: '#projects' },
  { title: 'Contact', to: '#contact' },
])

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
        <div class="innerContainer d-flex align-center justify-space-between px-3" :class="{ 'scrolled bg-blur': hasScrolled }">
          <div style="width: 40px;">
            <v-btn variant="text" size="small" :icon="mdiMenu" @click="drawer = !drawer" />
          </div>
          <div>
            <v-btn v-for="tab in tabs" :key="tab.to" variant="text" rounded="xl" class="mx-1" @click="goTo(tab.to, { offset: -80 })">
              {{ tab.title }}
            </v-btn>
            <!-- <v-btn variant="text" rounded="xl" class="mx-1" @click="goTo('#about', { offset: -80 })">
              About
            </v-btn>
            <v-btn variant="text" rounded="xl" class="mx-1" @click="goTo('#skills', { offset: -80 })">
              Skills
            </v-btn>
            <v-btn variant="text" rounded="xl" class="mx-1" @click="goTo('#projects', { offset: -80 })">
              Projects
            </v-btn>
            <v-btn variant="text" rounded="xl" class="mx-1" @click="goTo('#contact', { offset: -80 })">
              Contact
            </v-btn> -->
          </div>
          <div>
            <change-theme />
          </div>
        </div>
      </client-only>
    </div>
    <v-navigation-drawer v-model="drawer" temporary app class="px-3 bg-blur">
      <div class="d-flex justify-center h-100 flex-column">
        <v-btn v-for="tab in tabs" :key="tab.to" size="large" variant="text" rounded="xl" class="mx-1 w-100" @click="goTo(tab.to, { offset: -80 }); drawer = false">
          {{ tab.title }}
        </v-btn>
      </div>
    </v-navigation-drawer>
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
  background-color: rgb(var(--v-theme-background), 0.5);
}
.v-navigation-drawer {
  background-color: rgb(var(--v-theme-background), 0.5);
}
</style>