<script setup lang="ts">
import { useGoTo } from 'vuetify'

const goTo = useGoTo()
const route = useRoute()
const router = useRouter()
onMounted(() => {
  if (route.query.section) {
    goTo(`${route.query.section}`, { offset: -80 })
    router.replace({ query: {} })
  }
})
</script>

<template>
  <lazy-home-top hydrate-on-visible />
  <lazy-home-about hydrate-on-visible />
  <lazy-home-skills hydrate-on-visible />
  <lazy-home-projects hydrate-on-visible />
  <home-contact />
</template>
