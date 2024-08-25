<script setup lang="ts">

</script>

<template>
  <top />
  <about />
  <skills />
  <projects />
</template>

<style scoped lang="scss">
.projectCard {
  transition: all 0.3s;
  cursor: pointer;
}
.projectCard:hover {
  box-shadow: 0 0 4pt 2pt rgb(var(--v-theme-primary));
  scale: 1.03;
  transition: all 0.3s;
}
</style>