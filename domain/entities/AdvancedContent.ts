import { Property } from "./Property"

export interface AdvancedContent {
  id: string
  propertyId: string
  property?: Property
  tag: string
  title: string
  description?: string
  videoUrl: string
  durationSeconds: number
  price: number
  currency: string
  isBundle: boolean
  createdAt: Date
}