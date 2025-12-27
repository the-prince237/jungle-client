import { Property } from "../entities/Property"

export interface PropertyFilters {
  status?: 'active' | 'sold' | 'archived'
  acquisitionType?: 'rent' | 'sale'
  ownerId?: string
  minPrice?: number
  maxPrice?: number
  city?: string
  country?: string
}

export interface IPropertyRepository {
  findAll(filters?: PropertyFilters): Promise<Property[]>
  findById(id: string): Promise<Property | null>
  findBySlug(slug: string): Promise<Property | null>
  findByOwner(ownerId: string, status?: Property['status']): Promise<Property[]>
  create(property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>): Promise<Property>
  update(id: string, data: Partial<Property>): Promise<Property>
  archive(id: string): Promise<Property>
}