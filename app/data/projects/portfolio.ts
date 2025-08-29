import type { ProjectData } from '~/types/main'

export default {
  title: 'Portfolio',
  description: 'You\'re welcome to use my portfolio as a template for your own presentation. It\'s fully open-source and available on GitHub.',
  githubUrl: 'https://github.com/tilenpirih/portfolio',
  image: '/img/portfolio.webp',
  lazyImage: '/img/lazy/portfolio.webp',
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
      icon: '/img/technologies/bun.svg',
      link: 'https://bun.sh/',
    },
    {
      icon: '/img/technologies/docker.svg',
      link: 'https://www.docker.com/',
    },
    {
      icon: '/img/technologies/ts.svg',
      link: 'https://www.typescriptlang.org/',
    },
    {
      icon: '/img/technologies/emailjs.svg',
      link: 'https://www.emailjs.com/',
    },
  ],
  seo: {
    title: 'Project Portfolio',
    description: 'You\'re welcome to use my portfolio as a template for your own presentation. It\'s fully open-source and available on GitHub.',
    ogTitle: 'Project Portfolio',
    ogImage: '/img/portfolio.webp',
    ogUrl: '/project/portfolio',
  },

} satisfies ProjectData