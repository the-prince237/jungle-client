import { sanityClient } from '../client'
import { QUERIES } from '../queries'
import type { IAdvancedContentRepository } from '@/domain/repositories/IAdvancedContentRepository'
import type { AdvancedContent } from '@/domain/entities/AdvancedContent'

export class SanityAdvancedContentRepository implements IAdvancedContentRepository {
  async findById(id: string): Promise<AdvancedContent | null> {
    return await sanityClient.fetch(
      QUERIES.CONTENT_BY_TAG.replace('&& tag.current == $tag', ''),
      { id }
    )
  }

  async findByProperty(propertyId: string): Promise<AdvancedContent[]> {
    return await sanityClient.fetch(QUERIES.CONTENT_BY_PROPERTY, { propertyId })
  }

  async findByTag(propertyId: string, tag: string): Promise<AdvancedContent | null> {
    return await sanityClient.fetch(QUERIES.CONTENT_BY_TAG, { propertyId, _tag: tag })
  }

  async findBundles(propertyId: string): Promise<AdvancedContent[]> {
    return await sanityClient.fetch(
      QUERIES.CONTENT_BY_PROPERTY.replace(']', '&& isBundle == true]'),
      { propertyId }
    )
  }

  async create(content: Omit<AdvancedContent, 'id' | 'createdAt'>): Promise<AdvancedContent> {
    const result = await sanityClient.create({
      _type: 'advancedContent',
      propertyId: { _type: 'reference', _ref: content.propertyId },
      tag: { _type: 'slug', current: content.tag },
      title: content.title,
      description: content.description,
      videoUrl: content.videoUrl,
      durationSeconds: content.durationSeconds,
      price: content.price,
      currency: content.currency,
      isBundle: content.isBundle,
      createdAt: new Date().toISOString(),
    })
    return this.findById(result._id) as Promise<AdvancedContent>
  }

  async update(id: string, data: Partial<AdvancedContent>): Promise<AdvancedContent> {
    await sanityClient.patch(id).set(data).commit()
    return this.findById(id) as Promise<AdvancedContent>
  }

  async delete(id: string): Promise<void> {
    await sanityClient.delete(id)
  }
}
