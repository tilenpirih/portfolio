<script setup lang="ts">
import { mdiMenu } from '@mdi/js'
import { useDisplay } from 'vuetify'

const { smAndUp, xs } = useDisplay()
const route = useRoute()
const router = useRouter()
const hasScrolled = ref(false)
const drawer = ref(false)

const tabs = [
  { title: 'About', to: '/#about' },
  { title: 'Skills', to: '/#skills' },
  { title: 'Projects', to: '/projects' },
  { title: 'Blog', to: '/blog' },
  { title: 'Contact', to: '/#contact' },
]

function onScroll() {
  hasScrolled.value = window.scrollY > 8
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

function onTabClick(to: string) {
  drawer.value = false
  const target = router.resolve(to)
  if (target.hash && target.fullPath === route.fullPath)
    document.querySelector(target.hash)?.scrollIntoView()
}

function isActive(to: string) {
  const target = router.resolve(to)
  return target.hash ? false : route.path.startsWith(target.path)
}
</script>

<template>
  <div>
    <nav class="w-full fixed px-4 pt-4" style="z-index: 9999;">
      <div
        class="innerContainer flex items-center justify-between px-3 w-full rounded-full mb-0 border-2 border-solid"
        :class="hasScrolled ? 'scrolled bg-blur border-primary/50' : 'border-primary/0'"
      >
        <div style="width: 40px;">
          <v-btn
            v-if="xs"
            variant="text"
            size="small"
            :icon="mdiMenu"
            aria-label="Open navigation menu"
            :aria-expanded="drawer"
            @click="drawer = !drawer"
          />
        </div>

        <div v-if="smAndUp">
          <v-btn
            v-for="tab in tabs"
            :key="tab.to"
            :to="tab.to"
            :active="isActive(tab.to)"
            variant="text"
            rounded="xl"
            class="mx-1"
            @click="onTabClick(tab.to)"
          >
            {{ tab.title }}
          </v-btn>
        </div>
        <div>
          <change-theme />
        </div>
      </div>
    </nav>

    <v-navigation-drawer v-model="drawer" temporary app class="px-3 bg-blur" width="600" style="padding: 0px !important;">
      <div class="flex justify-center h-full flex-col px-3">
        <v-btn
          v-for="tab in tabs"
          :key="tab.to"
          :to="tab.to"
          :active="isActive(tab.to)"
          size="large"
          variant="text"
          rounded="xl"
          class="w-full"
          @click="onTabClick(tab.to)"
        >
          {{ tab.title }}
        </v-btn>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<style scoped lang="scss">
.innerContainer {
  height: 48px;
  transition: 0.3s ease;
}
.scrolled {
  background-color: rgb(var(--v-theme-surface), 0.5);
}
.v-navigation-drawer {
  background-color: rgb(var(--v-theme-surface), 0.7);
}
</style>
