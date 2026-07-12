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
  <div>
    <!-- Keep this single root element: app.pageTransition wraps pages in
         <Transition>, which cannot animate a fragment. A comment counts as a
         node too, so it has to stay inside the root rather than above it. -->
    <lazy-home-top id="top" hydrate-on-visible />
    <lazy-home-about id="about" hydrate-on-visible />
    <lazy-home-skills id="skills" hydrate-on-visible />
    <lazy-home-projects id="projects" hydrate-on-visible />
    <home-contact id="contact" />
  </div>
</template>
