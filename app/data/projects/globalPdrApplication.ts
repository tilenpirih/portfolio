import type { ProjectData } from '~/types/main'

export default {
  title: 'Global PDR Application',
  description: 'Global PDR Application is a web-based platform designed for logging and tracking vehicles, primarily used by car repair shops. Optimized for mobile devices, it also supports Progressive Web App (PWA) functionality, ensuring flexibility and easy customization for specific company needs. Technicians can add new vehicles along with detailed damage information, while administrators have full control over managing the data.',
  shortText: 'Mobile-friendly app for logging, tracking, and managing vehicle repairs.',
  image: '/img/globalPDR.webp',
  websiteUrl: 'https://globalpdr.org',
  lazyImage: '/img/lazy/globalPDR.webp',
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
      icon: '/img/technologies/fastapi.svg',
      link: 'https://fastapi.tiangolo.com/',
    },
    {
      icon: '/img/technologies/postgresql.svg',
      link: 'https://www.postgresql.org/',
    },
    {
      icon: '/img/technologies/docker.svg',
      link: 'https://www.docker.com/',
    },
    {
      icon: '/img/technologies/ts.svg',
      link: 'https://www.typescriptlang.org/',
    },
  ],
  seo: {
    title: 'Project Global PDR Application',
    description: 'Global PDR Application is a web-based platform designed for logging and tracking vehicles, primarily used by car repair shops. Optimized for mobile devices, it also supports Progressive Web App (PWA) functionality, ensuring flexibility and easy customization for specific company needs.',
    ogTitle: 'Project Global PDR Application',
    ogImage: '/img/globalPDR.webp',
    ogUrl: '/project/global_pdr_application',
  },
  videoId: 'cdXl7_E8sq4',

} satisfies ProjectData