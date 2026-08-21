<script setup lang="ts">
import { posts } from '~/data/blog'

const siteUrl = useSiteUrl()
useHead({
  title: 'Blog - Tilen Pirih',
  meta: [
    { name: 'description', content: 'Write-ups on the tooling and infrastructure decisions behind the apps I build.' },
    { property: 'og:title', content: 'Blog - Tilen Pirih' },
    { property: 'og:url', content: `${siteUrl}/blog` },
  ],
})

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}
</script>

<template>
  <div class="pt-3">
    <!-- Keep this single root element: app.pageTransition wraps pages in
         <Transition>, which cannot animate a fragment. -->
    <div class="bg-background pt-8">
      <animate-in preset="fade-down" immediate>
        <h1 class="text-h3 text-primary text-center pb-2">
          Blog
        </h1>
        <div class="text-center pb-6 px-4">
          Long-form write-ups on things I built to make my own work less tedious.
        </div>
      </animate-in>

      <v-container class="py-8" style="max-width: 860px;">
        <!-- The first card is above the fold, so it animates in CSS: a JS-driven
             one ships as opacity:0 and waits for hydration, which pins LCP to the
             bundle. See the `immediate` prop in AnimateIn.vue. -->
        <animate-in
          v-for="(entry, index) in posts"
          :key="entry.slug"
          preset="fade-up"
          :delay="index * 0.07"
          :immediate="index === 0"
        >
          <v-card class="rounded-lg pa-2 sm:pa-4 mb-6">
            <v-card-text class="pb-0">
              <div class="text-caption text-medium-emphasis">
                {{ formatDate(entry.date) }}
              </div>
            </v-card-text>

            <v-card-title tag="h2" class="text-h5 text-primary text-wrap">
              <nuxt-link :to="`/blog/${entry.slug}`" class="no-underline">
                {{ entry.title }}
              </nuxt-link>
            </v-card-title>

            <v-card-text class="pb-2">
              {{ entry.description }}
            </v-card-text>

            <v-card-text class="pt-0">
              <v-chip v-for="tag in entry.tags" :key="tag" size="small" variant="tonal" color="primary" class="mr-2 mb-2">
                {{ tag }}
              </v-chip>
            </v-card-text>
          </v-card>
        </animate-in>
      </v-container>
    </div>
  </div>
</template>
