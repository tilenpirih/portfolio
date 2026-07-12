import { defineNitroPlugin } from '#imports'

// The stylesheet is the last render-blocking request: on slow 4G the browser
// sits on a blank page for a full round trip (~450ms of the critical path)
// waiting for it. Inlining it swaps that round trip for ~14kB extra on the
// document, which brotli already covers — the two used to travel as separate
// responses anyway. `features.inlineStyles` can't do this (it only handles
// component-attributed CSS, see nuxt.config); but vite.build.cssCodeSplit=false
// means there is exactly one stylesheet, already concatenated in @layer order,
// so replacing its <link> with a <style> of the same bytes changes nothing
// about the cascade. Dev mode has no stylesheet link, so this no-ops there.
const cssCache = new Map<string, string>()

export default defineNitroPlugin(nitro => {
  // Dev serves CSS as Vite virtual modules (`/_nuxt/virtual:nuxt:...css`) that
  // only Vite's middleware can resolve — localFetch of one falls through to
  // the SSR catch-all route, which renders a page, which fires this hook
  // again: infinite recursion, and the dev server just spins. There's also no
  // request waterfall to win locally, so do nothing at all in dev.
  if (import.meta.dev)
    return

  nitro.hooks.hook('render:html', async html => {
    for (let i = 0; i < html.head.length; i++) {
      for (const [tag, href] of html.head[i]!.matchAll(/<link rel="stylesheet" href="(\/_nuxt\/[^"]+\.css)"[^>]*>/g)) {
        let css = cssCache.get(href!)
        if (css === undefined) {
          const res = await nitro.localFetch(href!, {})
          // The content-type check is what keeps a fallthrough response (a
          // rendered HTML page for a URL that isn't a real asset) from being
          // inlined as "CSS". Keep the <link> instead; slower but correct.
          if (!res.ok || !String(res.headers.get('content-type')).includes('text/css'))
            continue
          css = await res.text()
          // A `content: "</style>"` in the CSS would end our tag early and buy
          // an injection. Nothing in the build produces one, but if it ever
          // appears, fall back to the <link> instead of shipping broken HTML.
          if (css.includes('</style'))
            continue
          cssCache.set(href!, css)
        }
        html.head[i] = html.head[i]!.replace(tag, `<style>${css}</style>`)
      }
    }

    // Inlining buries everything after the <style> ~124kB deep into the
    // document, and unhead's capo sort puts styles before preloads — so the
    // LCP image's preload wouldn't be discovered until all of that had
    // streamed in. Hoist image preloads to just above the inlined <style>:
    // that keeps them in the first packet but still *after* the viewport
    // <meta>. Any earlier and the preload scanner evaluates imagesizes
    // against the default 980px desktop viewport and fetches a different
    // srcset candidate than the <img> later picks — two downloads.
    const imagePreloads: string[] = []
    html.head = html.head.map(entry =>
      entry.replaceAll(/<link rel="preload" as="image"[^>]*>/g, tag => {
        imagePreloads.push(tag)
        return ''
      }),
    )
    const styleEntry = html.head.findIndex(entry => entry.includes('<style>'))
    if (imagePreloads.length) {
      if (styleEntry === -1)
        html.head.push(imagePreloads.join(''))
      else
        html.head[styleEntry] = html.head[styleEntry]!.replace('<style>', `${imagePreloads.join('')}<style>`)
    }
  })
})
