import type { ProjectData } from '~/types/main'

export default {
  title: 'Free background remover',
  websiteUrl: 'https://bg-eraser.com/',
  description: 'This project allows you to instantly remove image backgrounds for free, with no limits or hidden fees. The process happens entirely on the client side, eliminating the need for server costs.',
  image: '/img/bg_eraser.webp',
  lazyImage: '/img/lazy/bg_eraser.webp',
  technologies: [
    {
      icon: '/img/technologies/nuxt.svg',
      link: 'https://nuxtjs.org/',
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
      icon: '/img/technologies/bun.svg',
      link: 'https://bun.sh/',
    },
    {
      icon: '/img/technologies/ts.svg',
      link: 'https://www.typescriptlang.org/',
    },
  ],
  seo: {
    title: 'Project Background remover',
    description: 'Remove image backgrounds instantly and for free. No limits, no hidden fees. Just fast and easy background remover.',
    ogTitle: 'Project Background remover',
    ogImage: '/img/bg_eraser.webp',
    ogUrl: '/project/bg_eraser',
  },
  videoId: 'lI33O427hX8',

} satisfies ProjectData