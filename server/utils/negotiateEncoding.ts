/**
 * Pick a response encoding from an Accept-Encoding header, preferring brotli.
 * Returns undefined when the client wants nothing we can produce.
 *
 * Parsed rather than substring-matched: a client can advertise `br;q=0` to say
 * it explicitly does *not* want brotli, and answering with one anyway hands it a
 * body it cannot decode. Kept in its own file so it can be tested without Nitro.
 */
export function negotiateEncoding(header: string): 'br' | 'gzip' | undefined {
  const accepted = header
    .split(',')
    .map(part => {
      const [name, ...params] = part.trim().split(';')
      const q = params.find(p => p.trim().startsWith('q='))
      return { name: name?.trim(), q: q ? Number.parseFloat(q.split('=')[1] ?? '1') : 1 }
    })
    .filter(e => e.q > 0)
    .map(e => e.name)

  return (['br', 'gzip'] as const).find(e => accepted.includes(e))
}
