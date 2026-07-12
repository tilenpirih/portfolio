# Tilen Pirih portfolio

Welcome to my portfolio website built using Nuxt 3, vuetify and integration with EmailJS. You can check out a live preview [here](https://tilenpirih.com/).

Feel free to modify this template and use it for your own portfolio.

## Setup

1. Copy `.env.example` to `.env`.
2. Install the required dependencies:

```bash
pnpm install
```

## Development Server

To start the development server, run the following command and open your browser at `http://localhost:3000`:

```bash
pnpm run dev
```

## Production

To build the application for production, use:

```bash
pnpm run build
```

You can then preview the production build locally with:

```bash
pnpm run preview
```

## Animation

Scroll reveals go through `<animate-in>` ([app/components/AnimateIn.vue](app/components/AnimateIn.vue)), a thin
wrapper over [motion-v](https://github.com/motiondivision/motion-vue). Pass a `preset`
(`fade-up` / `fade-down` / `fade-left` / `fade-right` / `flip-up`) and an optional `delay` in
seconds to stagger a list:

```vue
<animate-in preset="fade-up" :delay="index * 0.07">
  <v-card>...</v-card>
</animate-in>
```

It renders a `div` by default. Use `as-child` where a wrapper would break layout — for
example a `v-col` that has to stay a direct child of its `v-row`:

```vue
<animate-in preset="fade-right" as-child>
  <v-col cols="12" md="6">...</v-col>
</animate-in>
```

`<motion-config reduced-motion="user">` in the default layout means all of it honours
`prefers-reduced-motion`.
