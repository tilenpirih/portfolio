// Every technology is identified by its icon file, so the display name is
// derived from that rather than repeated on all ~84 entries in data/projects/.
// Screen readers read this out for the icon-only tech links on project pages.
const names: Record<string, string> = {
  advancedCropper: 'Vue Advanced Cropper',
  beautifulSoup: 'Beautiful Soup',
  bootstrapVue: 'BootstrapVue',
  bun: 'Bun',
  chromadb: 'Chroma',
  docker: 'Docker',
  electron: 'Electron',
  emailjs: 'EmailJS',
  fastapi: 'FastAPI',
  flask: 'Flask',
  js: 'JavaScript',
  laravel: 'Laravel',
  nodejs: 'Node.js',
  nuxt: 'Nuxt',
  openCV: 'OpenCV',
  peewee: 'Peewee',
  pinia: 'Pinia',
  pnpm: 'pnpm',
  postgresql: 'PostgreSQL',
  python: 'Python',
  pytorch: 'PyTorch',
  sentenceTransformers: 'Sentence Transformers',
  tailwind: 'Tailwind CSS',
  tiptap: 'Tiptap',
  tmdb: 'TMDB',
  ts: 'TypeScript',
  videojs: 'Video.js',
  vite: 'Vite',
  vue: 'Vue',
  vuetify: 'Vuetify',
  vuex: 'Vuex',
  yarn: 'Yarn',
  youtube: 'YouTube',
}

/** '/img/technologies/fastapi.svg' -> 'FastAPI'. Falls back to the bare filename. */
export function techName(icon: string): string {
  const key = icon.split('/').pop()?.replace(/\.\w+$/, '') ?? ''
  return names[key] ?? key
}
