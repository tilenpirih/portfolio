import { Buffer } from 'node:buffer'
import { promisify } from 'node:util'
import { brotliCompress, constants, gzip } from 'node:zlib'
import { defineNitroPlugin, getRequestHeader, setResponseHeader } from '#imports'

const compressors = {
  br: promisify<Buffer, Buffer>((buf, cb) => brotliCompress(buf, {
    // Default quality is 11, which spends ~100ms on a page this size for a few
    // hundred bytes over q5. This runs per request, so it has to stay cheap.
    params: { [constants.BROTLI_PARAM_QUALITY]: 5 },
  }, cb)),
  gzip: promisify<Buffer, Buffer>((buf, cb) => gzip(buf, { level: 6 }, cb)),
}

// Static assets are precompressed at build time (nitro.compressPublicAssets),
// but the SSR'd HTML is generated per request, so it has to be compressed here.
// Without this it goes out as ~80kB of plain text — the single biggest thing on
// the wire — because the nginx ingress in front of us doesn't compress either.
export default defineNitroPlugin(nitro => {
  nitro.hooks.hook('render:response', async (response, { event }) => {
    if (typeof response.body !== 'string')
      return

    // Vary regardless of whether we compressed: the response for this URL does
    // depend on Accept-Encoding, and a shared cache must not hand a brotli body
    // to a client that never asked for one.
    setResponseHeader(event, 'vary', 'accept-encoding')

    const encoding = negotiateEncoding(getRequestHeader(event, 'accept-encoding') ?? '')
    if (!encoding)
      return

    const compressed = await compressors[encoding](Buffer.from(response.body))
    setResponseHeader(event, 'content-encoding', encoding)
    setResponseHeader(event, 'content-length', compressed.byteLength)
    response.body = compressed as unknown as string
  })
})
