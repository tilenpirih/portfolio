import type { BlogSeries } from '~/types/main'

// Post metadata lives here, the prose lives in server/assets/blog/<slug>.md.
// The split is what keeps markdown-it and shiki out of the client bundle: the
// page needs the title and description for <head> before any content arrives,
// and everything below it comes from /api/blog/**.
export const series: BlogSeries[] = [
  {
    slug: 'nuxt-i18n-auto-keys',
    title: 'Nuxt i18n with no translation keys',
    description: 'I stopped naming translation keys. The English sentence is the key, one script decides where each string lives, and no locale file is ever edited by hand.',
    date: '2026-08-21',
    tags: ['Nuxt', 'vue-i18n', 'Tooling', 'DX'],
    parts: [
      {
        slug: 'nuxt-i18n-auto-keys',
        title: 'Nuxt i18n with no translation keys',
        description: 'The system this replaced, what naming keys by hand actually cost, and the one rule the whole thing rests on.',
      },
      {
        slug: 'nuxt-i18n-auto-keys/local-vs-global',
        title: 'Local or global, decided by usage',
        description: 'How a usage count moves a string between a component\'s own <i18n> block and the shared catalog — in both directions, without anyone deciding.',
      },
      {
        slug: 'nuxt-i18n-auto-keys/translation-workflow',
        title: 'Getting the other locales filled in',
        description: 'TODO_TRANSLATION placeholders, a flat export every translator (or model) can edit, and an import that puts each value back exactly where it came from.',
      },
      {
        slug: 'nuxt-i18n-auto-keys/rewriting-source-safely',
        title: 'Rewriting 700 components without breaking them',
        description: 'The script edits your source on every run. What that demands: idempotency, respect for hand-written code, and knowing what regex can\'t do.',
      },
    ],
  },
]

/** Every post, in reading order, flattened across series. */
export const posts = series.flatMap(entry => entry.parts)

export function findPost(slug: string) {
  return posts.find(post => post.slug === slug)
}

/** The series a post belongs to, whether it's the entry post or a later part. */
export function seriesOf(slug: string) {
  return series.find(entry => entry.parts.some(part => part.slug === slug))
}
