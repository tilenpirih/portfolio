import type { ProjectData } from '~/types/main'

export default {
  title: 'Ventic',
  description: `Ventic is a media library and BitTorrent player for the desktop, android and Android TV. It keeps track of what you are watching and plays torrents in a real mpv window rather than a browser video tag, so half-downloaded MKVs, HEVC, AV1 and DTS all simply play. The torrent engine runs inside the app, playback starts on the first bytes rather than after the download, and the whole library - history, progress, favourites, watchlist - lives on the device with no account and no server behind it. Every screen is reachable with a d-pad, so it is as comfortable driven by a TV remote as by a mouse.<br>
    It ships with no sources and searches nothing on its own: a source is a Stremio-protocol URL you add yourself. With none configured, Ventic is a general-purpose torrent client with a very good player attached.<br>
    The project began years ago as one of my first ventures into Vue and desktop development - an Electron app on Vue 2 and Vuetify that I shelved unfinished when time ran out. You can still see <a href="https://www.youtube.com/watch?v=8BgjFmTXyM0" target="_blank" rel="noopener">that first iteration here</a>. In August 2026 I rebuilt it from nothing: Nuxt 4 and Vuetify 4 in front, a Tauri 2 Rust shell that parents an actual mpv window into the page, libmpv linked and drawn directly on macOS where no other process's window can be embedded, and an ExoPlayer backend on Android answering the same command protocol - one player component, three backends underneath.<br>
    What made that speed possible was the order I worked in. I set the foundation up by hand: picking the stack and wiring it together - Nuxt 4 on a Tauri 2 shell, Vuetify and UnoCSS for the UI layer, Pinia for state, the torrent engine, the theming system, the linting and the build scripts - plus the project structure and the conventions everything after it would follow. That part is quick to do and expensive to get wrong, so it was worth doing myself rather than prompting for. With a solid base and the patterns already set, AI could set the pieces on top of it - screens, rooms, settings tabs, the Kotlin service, the ffmpeg work - quickly and consistently, with me reviewing every change against the foundation it was built on. Every non-obvious piece of logic got a runnable self-check beside it instead of a test framework, so release ranking, the disk budget, the backup round trip, the d-pad focus geometry and the contrast of all 26 themes are asserted rather than assumed. A project that had sat abandoned for years went from an empty repository to a released, cross-platform, self-updating app in under three weeks - and this time it is genuinely finished.`,
  shortText: 'Media library and BitTorrent player for desktop and Android TV, built with Nuxt and Tauri.',
  websiteUrl: 'https://ventic.tv/',
  videoId: 'ypqtd02nWQY',
  githubUrl: 'https://github.com/ventic/ventic',
  image: '/img/ventic.webp',
  lazyImage: '/img/lazy/ventic.webp',
  technologies: [
    {
      icon: '/img/technologies/nuxt.svg',
      link: 'https://nuxt.com/',
    },
    {
      icon: '/img/technologies/tauri.svg',
      link: 'https://v2.tauri.app/',
    },
    {
      icon: '/img/technologies/vuetify.svg',
      link: 'https://vuetifyjs.com/',
    },
    {
      icon: '/img/technologies/pinia.svg',
      link: 'https://pinia.vuejs.org/',
    },
    {
      icon: '/img/technologies/tmdb.svg',
      link: 'https://www.themoviedb.org/',
    },
    {
      icon: '/img/technologies/ts.svg',
      link: 'https://www.typescriptlang.org/',
    },
    { icon: '/img/technologies/rust.png', link: 'https://www.rust-lang.org/' },
    { icon: '/img/technologies/mpv.svg', link: 'https://mpv.io/' },
    { icon: '/img/technologies/kotlin.svg', link: 'https://kotlinlang.org/' },
    { icon: '/img/technologies/android.svg', link: 'https://developer.android.com/media/media3/exoplayer' },
    { icon: '/img/technologies/unocss.svg', link: 'https://unocss.dev/' },
    { icon: '/img/technologies/android.svg', link: 'https://www.android.com/tv/' },
    {
      icon: '/img/technologies/bun.svg',
      link: 'https://bun.com/',
    },
  ],
  seo: {
    title: 'Project Ventic',
    description: 'Ventic is a media library and BitTorrent player for desktop and Android TV, built with Nuxt 4 and Tauri 2. It plays torrents in a real embedded mpv window, runs its torrent engine in-process, keeps your library on the device, and is fully usable from a TV remote. A project I shelved years ago as an Electron app and rebuilt from scratch in under three weeks - the foundation by hand, then AI setting the pieces on top of it.',
    ogTitle: 'Project Ventic',
    ogImage: '/img/ventic.webp',
    ogUrl: '/project/ventic',
  },
} satisfies ProjectData
