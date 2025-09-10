import type { ProjectData } from '~/types/main'

export default {
  title: 'OKS - Prostovoljci',
  description: `I worked on the OKS - volunteers project in collaboration with <a href="https://onixweb.net" target="_blank">Onixweb d.o.o.</a>, a platform designed for volunteers to register, create accounts, and apply for events.  
  The application also includes advanced features such as volunteer management, reporting, assigning tasks, admin roles, and more.  
  We built the project using plain Vue for the frontend and Laravel for the backend.  
  My primary responsibility was frontend development, where I implemented the user interface and core functionalities, while I also contributed to some backend development tasks.`,
  shortText: 'Volunteer management platform built with Vue and Laravel.',
  websiteUrl: 'https://prostovoljci.olympic.si/',
  image: '/img/oks-volunteer.webp',
  lazyImage: '/img/lazy/oks-volunteer.webp',
  technologies: [
    {
      icon: '/img/technologies/vue.svg',
      link: 'https://vuejs.org/',
    },
    {
      icon: '/img/technologies/vuetify.svg',
      link: 'https://vuetifyjs.com/',
    },
    {
      icon: '/img/technologies/vite.svg',
      link: 'https://vite.dev/',
    },
    {
      icon: '/img/technologies/ts.svg',
      link: 'https://www.typescriptlang.org/',
    },
    {
      icon: '/img/technologies/pinia.svg',
      link: 'https://pinia.vuejs.org/',
    },
    {
      icon: '/img/technologies/laravel.svg',
      link: 'https://laravel.com/',
    },
    {
      icon: '/img/technologies/postgresql.svg',
      link: 'https://www.postgresql.org/',
    },
    {
      icon: '/img/technologies/docker.svg',
      link: 'https://www.docker.com/',
    },
  ],
  seo: {
    title: 'Project OKS - Prostovoljci',
    description: 'Volunteer management platform built with Vue and Laravel in collaboration with Onixweb d.o.o. It allows volunteers to register, apply for events, and enables admins to manage tasks, reports, and communication.',
    ogTitle: 'OKS - Prostovoljci',
    ogImage: '/img/oks-volunteer.webp',
    ogUrl: '/project/oks_volunteer',
  },
  videoId: 'Itk4is91igs',
} satisfies ProjectData