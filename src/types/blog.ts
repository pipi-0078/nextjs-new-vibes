export interface Post {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt?: string
  publishedAt: string
  updatedAt?: string
  image?: {
    alt?: string
    asset: {
      _ref: string
    }
  }
  body?: Array<Record<string, unknown>>
  categories?: Category[]
  tags?: Tag[]
  featured?: boolean
  draft?: boolean
}

export interface Category {
  _id: string
  title: string
  slug: {
    current: string
  }
  description?: string
  color: string
}

export interface Tag {
  _id: string
  title: string
  slug: {
    current: string
  }
  description?: string
}

export interface Profile {
  _id: string
  name: string
  bio?: string
  catchphrase?: string
  profileImage?: {
    alt?: string
    asset: {
      _ref: string
    }
  }
  experience?: Experience[]
  skills?: string[]
  socialLinks?: SocialLinks
  contactEmail?: string
}

export interface Experience {
  company: string
  position: string
  period: string
  description?: string
}

export interface SocialLinks {
  x?: string
  instagram?: string
  youtube?: string
  github?: string
  linkedin?: string
}