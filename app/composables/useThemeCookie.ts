export type ThemeName = 'light' | 'dark'

// Shared by the plugin that restores the theme during SSR and the toggle that
// writes it, so the two can't drift on cookie name or attributes.
export function useThemeCookie() {
  return useCookie<ThemeName | undefined>('theme', {
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
    path: '/',
  })
}
