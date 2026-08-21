import type { BlogPost } from '~/types/main'

// Post metadata lives here, the prose lives in server/assets/blog/<slug>.md.
// The split is what keeps markdown-it and shiki out of the client bundle: the
// page needs the title and description for <head> before any content arrives,
// and everything below it comes from /api/blog/**.
export const posts: BlogPost[] = [
  {
    slug: 'nuxt-i18n-auto-keys',
    title: 'Nuxt i18n with no translation keys',
    description: 'I stopped naming translation keys. The English sentence is the key, one script decides whether each string lives in a component\'s <i18n> block or the shared catalog, and no locale file is ever edited by hand.',
    date: '2026-08-21',
    tags: ['Nuxt', 'vue-i18n', 'Tooling', 'DX'],
  },
]

export function findPost(slug: string) {
  return posts.find(post => post.slug === slug)
}
