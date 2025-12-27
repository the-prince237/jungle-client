'use server'

import { SanityAdvancedContentRepository } from '@/infrastructure/sanity/repositories/SanityAdvancedContentRepository'
import { SanityViewAccessRepository } from '@/infrastructure/sanity/repositories/SanityViewAccessRepository'
import { CheckViewAccess } from '@/domain/use-cases/content/CheckViewAccess'

const contentRepo = new SanityAdvancedContentRepository()
const viewAccessRepo = new SanityViewAccessRepository()

export async function getPropertyContentAction(propertyId: string) {
  try {
    return await contentRepo.findByProperty(propertyId)
  } catch (error) {
    console.error('Error fetching content:', error)
    return []
  }
}

export async function checkContentAccessAction(userId: string, contentId: string) {
  try {
    const useCase = new CheckViewAccess(viewAccessRepo)
    return await useCase.execute(userId, contentId)
  } catch (error) {
    console.error('Error checking access:', error)
    return false
  }
}

export async function incrementViewCountAction(accessId: string) {
  try {
    await viewAccessRepo.incrementViewCount(accessId)
    return { success: true }
  } catch (error) {
    console.error('Error incrementing view count:', error)
    return { success: false }
  }
}
export async function getContentByTagAction(propertyId: string, tag: string) {
  try {
    return await contentRepo.findByTag(propertyId, tag)
  } catch (error) {
    console.error('Error fetching content by tag:', error)
    return null
  }
}