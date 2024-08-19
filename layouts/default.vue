<script setup lang="ts">
useHead({
  title: 'Global PDR - EST',
  meta: [
    { name: 'description', content: 'Ocena škode avtomobilov.' },
  ],
})
</script>

<template>
  <v-app class="bg-background">
    <navbar /> 
    <v-main>
        <slot />
    </v-main>
  </v-app>
</template>