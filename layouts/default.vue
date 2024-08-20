<script setup lang="ts">
useHead({
  title: 'Tilen Pirih - Fullstack developer',
  meta: [
    { name: 'description', content: 'My portfolio' },
  ],
})
</script>

<template>
  <v-app class="bg-background">
    <navbar style="margin-bottom: 64px;" />
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>