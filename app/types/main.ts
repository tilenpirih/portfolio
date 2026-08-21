interface Technology {
  icon: string
  link: string
}

export interface ProjectData {
  title: string
  websiteUrl?: string
  githubUrl?: string
  shortText: string
  image: string
  lazyImage: string
  description: string
  technologies: Technology[]
  videoId?: string
  seo: {
    title: string
    description: string
    ogTitle: string
    ogImage: string
    ogUrl: string
  }
}

export interface BlogPost {
  /** Path under `/blog`, and the name of the markdown file in `server/assets/blog`. */
  slug: string
  title: string
  description: string
}

export interface BlogSeries extends BlogPost {
  date: string
  tags: string[]
  /** Every post in reading order, starting with the one at the series' own slug. */
  parts: BlogPost[]
}
