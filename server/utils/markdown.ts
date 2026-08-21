import MarkdownIt from 'markdown-it'
import { createHighlighter } from 'shiki'

/**
 * Markdown → HTML for blog posts. Lives in `server/utils` on purpose: markdown-it
 * and shiki together are ~2MB of JS, and none of it belongs in the browser. The
 * page fetches the rendered HTML from `/api/blog/**`, so during SSR this runs as
 * a direct function call and on client-side navigation it's one small JSON
 * response — the highlighter never ships to the client.
 */

// Explicit list instead of shiki's full bundle: it loads a grammar per language
// on demand, so an unlisted one would throw at render time. Add the language
// here when a post starts using a new fence.
const LANGS = ['ts', 'js', 'vue', 'json', 'bash', 'diff', 'php', 'html']

// Dual theme. `defaultColor: false` emits both palettes as CSS variables on
// every token instead of baking one in, which is what lets the theme toggle
// re-colour code without re-rendering it — see the .shiki rules in
// app/pages/blog/[...slug].vue.
const THEMES = { light: 'github-light', dark: 'github-dark' }

export interface TocEntry {
  id: string
  text: string
  level: number
}

export interface RenderedPost {
  html: string
  toc: TocEntry[]
  minutes: number
}

// markdown-it's `highlight` hook is synchronous, so the highlighter has to be
// resolved before the instance is built. Both are created once per server
// process and reused.
let instance: Promise<MarkdownIt> | undefined

function markdown() {
  instance ??= createHighlighter({ themes: Object.values(THEMES), langs: LANGS })
    .then(shiki => new MarkdownIt({
      html: true,
      linkify: true,
      breaks: false,
      highlight: (code, lang) => shiki.codeToHtml(code, {
        lang: LANGS.includes(lang) ? lang : 'text',
        themes: THEMES,
        defaultColor: false,
      }),
    }))
  return instance
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/`/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export async function renderMarkdown(source: string): Promise<RenderedPost> {
  const md = await markdown()
  const tokens = md.parse(source, {})
  const toc: TocEntry[] = []
  const used = new Set<string>()

  // Heading ids come from the same walk that builds the table of contents, so
  // the two can't drift apart. h2/h3 only — h1 is the post title, h4+ is detail.
  tokens.forEach((token, i) => {
    if (token.type !== 'heading_open' || (token.tag !== 'h2' && token.tag !== 'h3'))
      return
    const text = tokens[i + 1]?.content ?? ''
    let id = slugify(text)
    while (used.has(id)) id += '-x'
    used.add(id)
    token.attrSet('id', id)
    toc.push({ id, text: text.replace(/`/g, ''), level: Number(token.tag.slice(1)) })
  })

  return {
    html: md.renderer.render(tokens, md.options, {}),
    toc,
    // 200 wpm, rounded up. Counting the markdown source rather than the text
    // overestimates on code-heavy posts, which is the honest direction to err.
    minutes: Math.max(1, Math.round(source.split(/\s+/).length / 200)),
  }
}
