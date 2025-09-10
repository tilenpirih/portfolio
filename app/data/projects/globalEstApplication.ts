import type { ProjectData } from '~/types/main'

export default {
  title: 'Global EST Application',
  description: 'This project allows users to create a car damage report. Users can select car parts and for images it can automatically gather images from a tunnel cameras with RTSP protocol. After all the data is inserted it generates a PDF report and with one click of a button it sends the report to the insurance company.',
  shortText: 'Create car damage reports with images and send them directly to insurance companies.',
  image: '/img/globalEST.webp',
  lazyImage: '/img/lazy/globalEST.webp',
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
      icon: '/img/technologies/python.svg',
      link: 'https://www.python.org/',
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
    {
      icon: '/img/technologies/openCV.svg',
      link: 'https://opencv.org/',
    },
  ],
  seo: {
    title: 'Project Global EST Application',
    description: 'This project allows users to create a car damage report. Users can select car parts and for images it can automatically gather images from a tunnel cameras with RTSP protocol. After all the data is inserted it generates a PDF report and with one click of a button it sends the report to the insurance company.',
    ogTitle: 'Project Global EST Application',
    ogImage: '/img/globalEST.webp',
    ogUrl: '/project/global_est_application',
  },
  videoId: 'fiTdl9njjoU',

} satisfies ProjectData