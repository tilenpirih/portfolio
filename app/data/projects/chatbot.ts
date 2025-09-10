import type { ProjectData } from '~/types/main'

export default {
  title: 'Custom AI Chatbot',
  description: `I developed a custom AI chatbot in Python that uses a vector database to store and retrieve knowledge.  
  When a user submits a query, the system searches the vector database for the most relevant questions and context, and then passes this information to the Gemini API to generate a coherent and natural response.  
  This project gave me hands-on experience with embeddings, semantic search, and integrating large language models with retrieval pipelines.`,
  shortText: 'Custom AI chatbot built in Python using a vector database and Gemini API.',
  image: '/img/chatbot.webp',
  lazyImage: '/img/lazy/chatbot.webp',
  technologies: [
    {
      icon: '/img/technologies/python.svg',
      link: 'https://www.python.org/',
    },
    {
      icon: '/img/technologies/fastapi.svg',
      link: 'https://fastapi.tiangolo.com/',
    },
    {
      icon: '/img/technologies/sentenceTransformers.webp',
      link: 'https://sbert.net/',
    },
    {
      icon: '/img/technologies/pytorch.svg',
      link: 'https://pytorch.org/',
    },
    {
      icon: '/img/technologies/docker.svg',
      link: 'https://www.docker.com/',
    },
    {
      icon: '/img/technologies/chromadb.svg',
      link: 'https://www.trychroma.com/',
    },
  ],
  seo: {
    title: 'Project Custom AI Chatbot',
    description: 'Custom AI chatbot built in Python that uses a vector database for semantic search and the Gemini API to generate accurate, context-aware responses.',
    ogTitle: 'Custom AI Chatbot',
    ogImage: '/img/chatbot.webp',
    ogUrl: '/project/chatbot',
  },
  videoId: 'H9MKZvlNDqQ',
} satisfies ProjectData