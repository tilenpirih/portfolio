/**
 * Renders one post from `server/assets/blog/<slug>.md`.
 *
 * Posts are server assets rather than files read off disk so they get bundled
 * into `.output` — the deployed image has no repo to read from.
 */
export default defineEventHandler(async event => {
  const slug = getRouterParam(event, 'slug') ?? ''

  // The storage key is built from the URL, so it has to be constrained before
  // it gets there: a `..` segment would read outside the blog directory.
  if (!/^[a-z0-9-]+(?:\/[a-z0-9-]+)*$/.test(slug))
    throw createError({ statusCode: 400, statusMessage: 'Invalid post slug' })

  const source = await useStorage('assets:server').getItem<string>(`blog/${slug}.md`)
  if (!source)
    throw createError({ statusCode: 404, statusMessage: 'Post not found' })

  return renderMarkdown(source)
})
