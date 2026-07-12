/**
 * Absolute origin of the site, e.g. `https://tilenpirih.com`. Never ends in `/`.
 *
 * canonical/og:image/og:url must be absolute URLs, so every one of them needs
 * this. It reads BASE_URL, and falls back to the origin of the request being
 * served — because a misconfigured BASE_URL fails silently and invisibly: the
 * tags still render, just relative, and link previews quietly stop working.
 */
export function useSiteUrl() {
  const configured = useRuntimeConfig().public.BASE_URL
  if (configured)
    return configured.replace(/\/$/, '')

  // Behind the nginx ingress the real scheme/host only survive in X-Forwarded-*.
  return useRequestURL({ xForwardedHost: true, xForwardedProto: true }).origin
}
