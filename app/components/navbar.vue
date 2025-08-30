<script setup lang="ts">
import { mdiMenu } from '@mdi/js'
import { useDisplay, useGoTo } from 'vuetify'

const { smAndUp, xs } = useDisplay()
const goTo = useGoTo()
const hasScrolled = ref(false)
const drawer = ref(false)
const tabs = ref([
  { title: 'About', path: '/#about' },
  { title: 'Skills', path: '/#skills' },
  { title: 'Projects', path: '/projects' },
  { title: 'Blog', path: '/blog' },
  { title: 'Contact', path: '/#contact' },
])
const router = useRouter()
const route = useRoute()
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
function clickButton(id: string) {
  // if (route.path === '/') {
  //   goTo(id, { offset: -80 })
  // }
  // else {
  //   router.push({ path: '/', query: { section: id } })
  // }
  router.push({ path: '/', hash: id })
}
</script>

<template>
  <div>
    <div class="w-100 position-fixed px-4 pt-4" style="z-index: 9999;">
      <div
        class="innerContainer d-flex align-center justify-space-between px-3 w-100 rounded-pill mb-0 border-md border-primary border-opacity-0"
        :class="{ 'scrolled bg-blur border-opacity-50': hasScrolled }"
      >
        <div style="width: 40px;">
          <v-btn v-if="xs" variant="text" size="small" :icon="mdiMenu" @click="drawer = !drawer" />
        </div>

        <div v-if="smAndUp">
          <nuxt-link v-for="tab in tabs" :key="tab.path" :to="tab.path">
            <v-btn variant="text" rounded="xl" class="mx-1">
              {{ tab.title }}
            </v-btn>
          </nuxt-link>
        </div>
        <div>
          <change-theme />
        </div>
      </div>
    </div>
    <v-navigation-drawer v-model="drawer" temporary app class="px-3 bg-blur" width="600" style="padding: 0px !important;">
      <div class="d-flex justify-center h-100 flex-column px-3" @click.stop="drawer = false">
        <v-btn v-for="tab in tabs" :key="tab.path" size="large" variant="text" rounded="xl" class="w-100" @click.stop="clickButton(tab.path); drawer = false">
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