<script setup lang="ts">
import { mdiArrowLeft } from '@mdi/js'
import { findPost } from '~/data/blog'

// Without this, Vue reuses one component instance across every /blog/** path —
// same route record — so setup never re-runs and the next post would render
// the previous one's content.
definePageMeta({ key: route => route.fullPath })

const route = useRoute()
const slug = (Array.isArray(route.params.slug) ? route.params.slug : [route.params.slug])
  .filter(Boolean)
  .join('/')

const post = findPost(slug)
if (!post)
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })

const { data } = await useFetch(`/api/blog/${slug}`)

const siteUrl = useSiteUrl()
useHead({
  title: `${post.title} - Tilen Pirih`,
  meta: [
    { name: 'description', content: post.description },
    { property: 'og:title', content: post.title },
    { property: 'og:description', content: post.description },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: `${siteUrl}/blog/${slug}` },
    { property: 'article:published_time', content: post.date },
  ],
})

const publishedOn = new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
</script>

<template>
  <div class="pt-3">
    <!-- Keep this single root element: app.pageTransition wraps pages in
         <Transition>, which cannot animate a fragment. -->
    <div class="bg-background pt-8">
      <v-container class="py-8" style="max-width: 800px;">
        <animate-in preset="fade-down" immediate>
          <nuxt-link to="/blog" class="text-caption d-inline-flex align-center mb-4">
            <v-icon :icon="mdiArrowLeft" size="small" class="mr-1" />
            All posts
          </nuxt-link>

          <h1 class="text-h4 text-sm-h3 text-primary pb-3">
            {{ post.title }}
          </h1>

          <div class="text-caption text-medium-emphasis pb-6">
            {{ publishedOn }}<span v-if="data"> &middot; {{ data.minutes }} min read</span>
          </div>
        </animate-in>

        <animate-in v-if="data?.toc.length" preset="fade-up" immediate>
          <v-card variant="tonal" color="primary" class="rounded-lg mb-8">
            <v-card-text>
              <div class="text-overline">
                On this page
              </div>
              <ul class="toc">
                <li v-for="entry in data.toc" :key="entry.id" :class="{ 'toc--sub': entry.level === 3 }">
                  <a :href="`#${entry.id}`">{{ entry.text }}</a>
                </li>
              </ul>
            </v-card-text>
          </v-card>
        </animate-in>

        <!-- eslint-disable-next-line vue/no-v-html -- rendered by our own
             markdown pipeline from files we author, see server/utils/markdown.ts -->
        <article class="prose" v-html="data?.html" />

        <v-divider class="my-10" />

        <v-btn to="/blog" variant="tonal" class="text-none" size="large">
          <v-icon :icon="mdiArrowLeft" class="mr-2" />
          All posts
        </v-btn>
      </v-container>
    </div>
  </div>
</template>

<style scoped lang="scss">
.toc {
  margin: 8px 0 0;
  padding-left: 18px;
  line-height: 1.9;
}
.toc--sub {
  list-style: circle;
  margin-left: 16px;
  font-size: 0.9em;
}

/* The article is v-html, so none of it carries the scope attribute — every rule
   below has to go through :deep(). */
.prose {
  font-size: 1.05rem;
  line-height: 1.75;
  color: rgb(var(--v-theme-on-surface));

  :deep(h2) {
    margin: 2.5em 0 0.6em;
    font-size: 1.6rem;
    font-weight: 600;
    line-height: 1.3;
    color: rgb(var(--v-theme-primary));
    /* Anchors from the table of contents would otherwise land under the fixed
       navbar (48px tall, 16px of top padding). */
    scroll-margin-top: 80px;
  }

  :deep(h3) {
    margin: 2em 0 0.5em;
    font-size: 1.2rem;
    font-weight: 600;
    line-height: 1.4;
    scroll-margin-top: 80px;
  }

  :deep(p),
  :deep(ul),
  :deep(ol) {
    margin: 1.1em 0;
  }

  :deep(li) {
    margin: 0.4em 0;
  }

  :deep(strong) {
    font-weight: 600;
  }

  :deep(hr) {
    margin: 2.5em 0;
    border: none;
    border-top: 1px solid rgba(var(--v-theme-outline-variant), 1);
  }

  :deep(blockquote) {
    margin: 1.5em 0;
    padding: 0.2em 0 0.2em 1.2em;
    border-left: 3px solid rgb(var(--v-theme-primary));
    color: rgba(var(--v-theme-on-surface), 0.85);
  }

  :deep(table) {
    width: 100%;
    margin: 1.5em 0;
    border-collapse: collapse;
    font-size: 0.95rem;
  }

  :deep(th),
  :deep(td) {
    padding: 8px 12px;
    border-bottom: 1px solid rgba(var(--v-theme-outline-variant), 1);
    text-align: left;
    vertical-align: top;
  }

  /* Inline code only — the `pre code` reset below undoes this inside blocks. */
  :deep(code) {
    padding: 2px 6px;
    border-radius: 4px;
    background-color: rgba(var(--v-theme-primary), 0.12);
    font-family: ui-monospace, 'SFMono-Regular', 'Menlo', monospace;
    font-size: 0.875em;
    word-break: break-word;
    /* Quoted code should read exactly as it was written — with ligatures on,
       a `=>` renders as a ⇒ that is nowhere in the source. */
    font-variant-ligatures: none;
  }

  :deep(pre) {
    margin: 1.5em 0;
    padding: 16px;
    border: 1px solid rgba(var(--v-theme-outline-variant), 1);
    border-radius: 8px;
    /* A long line scrolls the block, never the page. */
    overflow-x: auto;
    font-size: 0.85rem;
    line-height: 1.6;
    /* Shiki ships its theme's own background; the site's surface blends better. */
    background-color: rgb(var(--v-theme-surface-container-lowest)) !important;
  }

  :deep(pre code) {
    padding: 0;
    background: none;
    font-size: inherit;
  }
}

/* Shiki emits both palettes as CSS variables per token (defaultColor: false),
   so switching themes is a variable swap rather than a re-render. */
.prose :deep(.shiki span) {
  color: var(--shiki-light);
}
.v-theme--dark .prose :deep(.shiki span) {
  color: var(--shiki-dark);
}
</style>
