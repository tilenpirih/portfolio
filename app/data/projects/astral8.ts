import type { ProjectData } from '~/types/main'

export default {
  title: 'Astral8',
  description: `Astral8 is an all-in-one emergency management platform for fire departments, bringing operations, equipment, training, prevention, and command together into one clear system. It replaces scattered paperwork and duplicated effort with a single operational view of units, personnel, hydrants, AEDs, and critical locations, so crews spend less time searching and more time acting.<br>
    I joined the development team in January 2026. The Vue/Nuxt stack was still new to the team, so my work started at the foundation rather than at individual screens: translation tooling and typed i18n keys in the first week, a Docker and dev-environment cleanup, and splitting the oversized profile pages into proper tabbed routes. In February came the first big cross-cutting change, a full timezone rewrite across roughly 250 files so every date in the app was stored, sent, and displayed correctly no matter where the department was.<br>
    Spring was mostly the data layer and the patterns around it. I rewrote the data table into one reusable component with server-side pagination, sorting, filtering, and persisted state, then migrated every list and profile tab in the app onto it, module by module. Alongside that came the Nuxt 4 migration, a calendar rewrite, and a lot of unification work: comboboxes bound to ids instead of ad-hoc objects, a single shared error-handling path that removed around 5,800 lines, and an ESLint setup the whole team could work with.<br>
    From June the focus moved to performance, tooling, and consistency. I migrated i18n to an auto-generated value-as-key system on both the Nuxt and Laravel sides, added route prefetching, removed the async calls that were blocking navigation, and took out the full-page loading gate so the app genuinely server-renders, which meant fixing the hydration mismatches it had been hiding. I set up Vitest as a fast unit and component layer next to Playwright, so most of the frontend could be covered in seconds instead of minutes. The last big piece was a Tailwind refactor onto one semantic design token per role, replacing thousands of hardcoded colours and dark-mode variants, with scripts to audit contrast and prove no pixel had changed.<br>
    A good part of the job was proposing this work in the first place, spotting what would slow everyone down three months later and writing the convention down so it stayed fixed. It was a genuinely great team to work with, and I really enjoyed my time on it.`,
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
    description: 'Astral8 is an all-in-one emergency management platform for fire departments, uniting operations, equipment, training, and command in one system. I joined in January 2026 and worked on the Vue/Nuxt foundations: a full timezone rewrite, a reusable data table, auto-generated i18n, prefetching and SSR work, a Vitest test layer, and a Tailwind design-token refactor.',
    ogTitle: 'Project Astral8',
    ogImage: '/img/astral8.webp',
    ogUrl: '/project/astral8',
  },
  videoId: 'Mb9WpUXpce4',

} satisfies ProjectData
