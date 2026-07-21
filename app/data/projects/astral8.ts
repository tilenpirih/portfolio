import type { ProjectData } from '~/types/main'

export default {
  title: 'Astral8',
  description: `Astral8 is an all-in-one emergency management platform for fire departments, bringing operations, equipment, training, prevention, and command together into one clear system. It replaces scattered paperwork and duplicated effort with a single operational view of units, personnel, hydrants, AEDs, and critical locations, so crews spend less time searching and more time acting.<br>
    I joined the development team in January 2026 and I'm still working on the project today. When I came on board, the Vue/Nuxt stack was new to the team, so my main focus was setting up solid foundations, configuring the linter, building out i18n and translations, creating reusable data tables, and establishing the patterns the rest of the frontend would grow from. It's a genuinely great team to work with, and I've really enjoyed my time here.`,
  shortText: 'All-in-one emergency management platform for fire departments.',
  websiteUrl: 'https://astral8.io/',
  image: '/img/astral8.webp',
  lazyImage: '/img/lazy/astral8.webp',
  technologies: [
    {
      icon: '/img/technologies/nuxt.svg',
      link: 'https://nuxtjs.org/',
    },
    {
      icon: '/img/technologies/ts.svg',
      link: 'https://www.typescriptlang.org/',
    },
    {
      icon: '/img/technologies/laravel.svg',
      link: 'https://laravel.com/',
    },
    {
      icon: '/img/technologies/pinia.svg',
      link: 'https://pinia.vuejs.org/',
    },
    {
      icon: '/img/technologies/rekaui.svg',
      link: 'https://reka-ui.com/',
    },
    
  ],
  seo: {
    title: 'Project Astral8',
    description: 'Astral8 is an all-in-one emergency management platform for fire departments, uniting operations, equipment, training, and command in one system. I joined the team in January 2026 to help set up the Vue/Nuxt foundations, from linting and i18n to reusable tables and frontend patterns.',
    ogTitle: 'Project Astral8',
    ogImage: '/img/astral8.webp',
    ogUrl: '/project/astral8',
  },
  videoId: 'Mb9WpUXpce4',

} satisfies ProjectData