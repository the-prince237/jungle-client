import { sanityClient } from '../client'
import { QUERIES } from '../queries'
import type { IViewAccessRepository } from '@/domain/repositories/IViewAccessRepository'
import type { ViewAccess } from '@/domain/entities/ViewAccess'

export class SanityViewAccessRepository implements IViewAccessRepository {
  async findById(id: string): Promise<ViewAccess | null> {
    return await sanityClient.fetch(
      `*[_type == "viewAccess" && _id == $id][0]`,
      { id }
    )
  }

  async findByUserAndContent(userId: string, contentId: string): Promise<ViewAccess | null> {
    return await sanityClient.fetch(QUERIES.VIEW_ACCESS_CHECK, { userId, contentId })
  }

  async findByUser(userId: string): Promise<ViewAccess[]> {
    return await sanityClient.fetch(QUERIES.VIEW_ACCESS_BY_USER, { userId })
  }

  async hasAccess(userId: string, contentId: string): Promise<boolean> {
    const access = await this.findByUserAndContent(userId, contentId)
    if (!access) return false
    
    const isExpired = access.viewCount >= access.maxViews
    const isDateExpired = access.expiresAt && new Date(access.expiresAt) < new Date()
    
    return !isExpired && !isDateExpired
  }

  async incrementViewCount(id: string): Promise<ViewAccess> {
    const access = await this.findById(id)
    if (!access) throw new Error('ViewAccess not found')
    
    await sanityClient.patch(id).set({
      viewCount: access.viewCount + 1
    }).commit()
    
    return this.findById(id) as Promise<ViewAccess>
  }

  async create(access: Omit<ViewAccess, 'id' | 'createdAt'>): Promise<ViewAccess> {
    const result = await sanityClient.create({
      _type: 'viewAccess',
      userId: { _type: 'reference', _ref: access.userId },
      contentId: { _type: 'reference', _ref: access.contentId },
      paymentId: { _type: 'reference', _ref: access.paymentId },
      expiresAt: access.expiresAt?.toISOString(),
      viewCount: access.viewCount,
      maxViews: access.maxViews,
      createdAt: new Date().toISOString(),
    })
    return this.findById(result._id) as Promise<ViewAccess>
  }
}
