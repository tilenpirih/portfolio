# Tilen Pirih portfolio

Welcome to my portfolio website built using Nuxt 3, vuetify and integration with EmailJS. You can check out a live preview [here](https://tilenpirih.com/).

Feel free to modify this template and use it for your own portfolio.

## Setup

1. Copy `.env.example` to `.env`.
2. Install the required dependencies:

```bash
bun install
```

## Development Server

To start the development server, run the following command and open your browser at `http://localhost:3000`:

```bash
bun run dev
```

## Production

To build the application for production, use:

```bash
bun run build
```

You can then preview the production build locally with:

```bash
bun run preview
```
## TODO
Currently AOS have a bug that if the elements has a class I get a hydration mismatch error. [Issue](https://github.com/egidiusmengelberg/nuxt-aos/issues/19)
Currently I implemented a "hack" that I wrap every element in a div without any classes or use inline styles