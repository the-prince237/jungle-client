import { sanityClient } from '../client'
import { QUERIES } from '../queries'
import type { IPropertyRepository, PropertyFilters } from '@/domain/repositories/IPropertyRepository'
import type { Property } from '@/domain/entities/Property'

export class SanityPropertyRepository implements IPropertyRepository {
  async findAll(filters?: PropertyFilters): Promise<Property[]> {
    const status = filters?.status || 'active'
    let query = QUERIES.PROPERTIES_ALL
    
    if (filters?.city) {
      query = query.replace('*[_type == "property"', `*[_type == "property" && location.city == "${filters.city}"`)
    }
    
    return await sanityClient.fetch(query, { status })
  }

  async findById(id: string): Promise<Property | null> {
    return await sanityClient.fetch(
      QUERIES.PROPERTY_BY_SLUG.replace('slug.current == $slug', '_id == $id'),
      { id }
    )
  }

  async findBySlug(slug: string): Promise<Property | null> {
    return await sanityClient.fetch(QUERIES.PROPERTY_BY_SLUG, { slug })
  }

  async findByOwner(ownerId: string, status?: Property['status']): Promise<Property[]> {
    return await sanityClient.fetch(QUERIES.PROPERTIES_BY_OWNER, { 
      ownerId, 
      status: status || 'active' 
    })
  }

  async create(property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>): Promise<Property> {
    const now = new Date().toISOString()
    const result = await sanityClient.create({
      _type: 'property',
      ownerId: { _type: 'reference', _ref: property.ownerId },
      title: property.title,
      slug: { _type: 'slug', current: property.slug },
      description: property.description,
      price: property.price,
      currency: property.currency,
      location: property.location,
      acquisitionType: property.acquisitionType,
      status: property.status,
      coverImageUrl: property.coverImageUrl,
      galleryUrls: property.galleryUrls,
      createdAt: now,
      updatedAt: now,
    })
    return this.findById(result._id) as Promise<Property>
  }

  async update(id: string, data: Partial<Property>): Promise<Property> {
    await sanityClient.patch(id).set({
      ...data,
      updatedAt: new Date().toISOString(),
    }).commit()
    return this.findById(id) as Promise<Property>
  }

  async archive(id: string): Promise<Property> {
    return this.update(id, { status: 'archived' })
  }
}