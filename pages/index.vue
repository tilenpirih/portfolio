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
  <home-top />
  <home-about />
  <home-skills />
  <home-projects />
  <home-contact />
</template>
