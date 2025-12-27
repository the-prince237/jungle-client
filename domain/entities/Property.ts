import { User } from "./User"

export interface Location {
  country: string
  city: string
  area: string
  lat?: number
  lng?: number
}

export interface Property {
  id: string
  ownerId: string
  owner?: User
  title: string
  slug: string
  description: string
  price: number
  currency: string
  location: Location
  acquisitionType: 'rent' | 'sale'
  status: 'active' | 'sold' | 'archived'
  coverImageUrl: string
  galleryUrls: string[]
  createdAt: Date
  updatedAt: Date
}