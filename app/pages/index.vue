<script setup lang="ts">
import { useGoTo } from 'vuetify'

const goTo = useGoTo()
const route = useRoute()
const router = useRouter()

onMounted(() => {
  if (route.hash) {
    goTo(route.hash, { offset: -80 })
    router.replace({ hash: '' })
  }
})

watch(() => route.hash, newHash => {
  if (newHash) {
    goTo(newHash, { offset: -80 })
    router.replace({ hash: '' })
  }
})
</script>

<template>
  <lazy-home-top id="top" hydrate-on-visible />
  <lazy-home-about id="about" hydrate-on-visible />
  <lazy-home-skills id="skills" hydrate-on-visible />
  <lazy-home-projects id="projects" hydrate-on-visible />
  <home-contact id="contact" />
</template>
