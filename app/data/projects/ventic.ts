import type { ProjectData } from '~/types/main'

export default {
  title: 'Ventic',
  description: 'This project was originally designed to be an all-in-one tool for streaming various types of media. It was one of my first ventures into the Vue ecosystem and desktop application development. Unfortunately, due to time constraints and other commitments, I had to put it on hold. However, the experience was invaluable, and I gained a lot from it. <br> While several features are still missing, the tool is already great for discovering new movies, shows, actors, and watching trailers. I plan to revisit this project, rewriting it using Vue 3 and switching from Electron to Tauri, with the goal of delivering a fully polished product.',
  shortText: 'Desktop app for discovering movies, shows, and trailers, built with Vue and Electron.',
  githubUrl: 'https://github.com/tilenpirih/ventic-clone',
  image: '/img/ventic.webp',
  lazyImage: '/img/lazy/ventic.webp',
  technologies: [
    {
      icon: '/img/technologies/vue.svg',
      link: 'https://vuejs.org/',
    },
    {
      icon: '/img/technologies/electron.svg',
      link: 'https://www.electronjs.org/',
    },
    {
      icon: '/img/technologies/vuetify.svg',
      link: 'https://vuetifyjs.com/',
    },
    {
      icon: '/img/technologies/vuex.svg',
      link: 'https://vuex.vuejs.org/',
    },
    {
      icon: '/img/technologies/tmdb.svg',
      link: 'https://www.themoviedb.org/',
    },
    {
      icon: '/img/technologies/js.svg',
      link: 'https://www.w3schools.com/js/',
    },
    {
      icon: '/img/technologies/videojs.svg',
      link: 'https://videojs.com/',
    },
    {
      icon: '/img/technologies/nodejs.svg',
      link: 'https://nodejs.org/en',
    },
  ],
  seo: {
    title: 'Project Ventic',
    description: 'This project was originally designed to be an all-in-one tool for streaming various types of media. It was one of my first ventures into the Vue ecosystem and desktop application development. Unfortunately, due to time constraints and other commitments, I had to put it on hold. However, the experience was invaluable, and I gained a lot from it.',
    ogTitle: 'Project Ventic',
    ogImage: '/img/ventic.webp',
    ogUrl: '/project/ventic',
  },
  videoId: '8BgjFmTXyM0',
} satisfies ProjectData