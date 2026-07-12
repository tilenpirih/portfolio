import { defineNitroPlugin } from '#imports'

// Nuxt modulepreloads the whole module graph — ~30 chunks, ~200kB — and the
// browser fetches every one of them at High priority. That puts them in a
// bandwidth race with the stylesheet and the hero image, which are the two
// things first paint and LCP actually wait on. On a fast connection nobody
// notices; on a slow one the decoration wins the race and the content loses.
//
// fetchpriority=low keeps the preloading (so hydration still doesn't have to
// discover the graph one round trip at a time) while dropping the chunks below
// the CSS and the LCP image in the queue.
export default defineNitroPlugin(nitro => {
  nitro.hooks.hook('render:html', html => {
    html.head = html.head.map(tag =>
      tag.replaceAll('rel="modulepreload"', 'rel="modulepreload" fetchpriority="low"'),
    )
  })
})
