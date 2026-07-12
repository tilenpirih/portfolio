<script setup lang="ts">
import bgEraser from '~/data/projects/bgEraser'
import globalEstApplication from '~/data/projects/globalEstApplication'
import globalPdrApplication from '~/data/projects/globalPdrApplication'
import kkKrkaImageGenerator from '~/data/projects/kkKrkaImageGenerator'
import kzs from '~/data/projects/kzs'
import nktolmin from '~/data/projects/nktolmin'
import portfolio from '~/data/projects/portfolio'
import ventic from '~/data/projects/ventic'

const projects = [
  bgEraser,
  globalEstApplication,
  kkKrkaImageGenerator,
  portfolio,
  globalPdrApplication,
  kzs,
  ventic,
  nktolmin,
]
</script>

<template>
  <div class="pt-3">
    <!-- Keep this single root element: app.pageTransition wraps pages in
         <Transition>, which cannot animate a fragment. -->
    <div class="bg-background pt-8">
      <animate-in preset="fade-down">
        <div class="text-h3 text-primary text-center pb-2">
          Blog
        </div>
        <div class="text-center pb-6">
          Here I will be posting some blog posts in the future. Still in development.
        </div>
      </animate-in>
    </div>
  </div>
</template>