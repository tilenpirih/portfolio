import type { ProjectData } from '~/types/main'

export default {
  title: 'Astral8',
  description: `Astral8 is an all-in-one emergency management platform for fire departments, bringing operations, equipment, training, prevention, and command together into one clear system. It replaces scattered paperwork and duplicated effort with a single operational view of units, personnel, hydrants, AEDs, and critical locations, so crews spend less time searching and more time acting.<br>
    I joined the development team in January 2026, at a point where the Vue/Nuxt stack was still new to the team, and spent most of my time on the foundation the rest of the frontend was built on rather than on individual screens. That meant setting up linting and code style, building the i18n and translation pipeline, and creating the reusable data tables, forms, and modal patterns that every list and detail page in the app now uses.<br>
    From there the work went deeper into the platform itself: a full Tailwind refactor onto a single set of semantic design tokens, correct timezone handling end to end, server-side rendering and hydration fixes, prefetching and other performance work, and splitting oversized pages into composables and components with clear ownership. A lot of it was also about conventions, writing the patterns and guidelines down so the codebase stayed consistent as the team grew. It was a genuinely great team to work with, and I really enjoyed my time on it.`,
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
    description: 'Astral8 is an all-in-one emergency management platform for fire departments, uniting operations, equipment, training, and command in one system. I joined the team in January 2026 and worked on the Vue/Nuxt foundations, from linting, i18n and reusable data tables to a Tailwind design-token refactor, timezone handling, SSR and performance work.',
    ogTitle: 'Project Astral8',
    ogImage: '/img/astral8.webp',
    ogUrl: '/project/astral8',
  },
  videoId: 'Mb9WpUXpce4',

} satisfies ProjectData
