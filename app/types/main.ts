interface Technology {
  icon: string
  link: string
}

export interface ProjectData {
  title: string
  websiteUrl?: string
  githubUrl?: string
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