'use server'

import { revalidatePath } from 'next/cache'
import { SanityPropertyRepository } from '@/infrastructure/sanity/repositories/SanityPropertyRepository'
import { GetAllProperties } from '@/domain/use-cases/property/GetAllProperties'
import { GetPropertyBySlug } from '@/domain/use-cases/property/GetPropertyBySlug'
import type { PropertyFilters } from '@/domain/repositories/IPropertyRepository'

const propertyRepo = new SanityPropertyRepository()

export async function getPropertiesAction(filters?: PropertyFilters) {
  try {
    const useCase = new GetAllProperties(propertyRepo)
    return await useCase.execute(filters)
  } catch (error) {
    console.error('Error fetching properties:', error)
    return []
  }
}

export async function getPropertyBySlugAction(slug: string) {
  try {
    const useCase = new GetPropertyBySlug(propertyRepo)
    return await useCase.execute(slug)
  } catch (error) {
    console.error('Error fetching property:', error)
    return null
  }
}

export async function archivePropertyAction(propertyId: string) {
  try {
    await propertyRepo.archive(propertyId)
    revalidatePath('/profile/me/my-properties')
    return { success: true }
  } catch (error) {
    console.error('Error archiving property:', error)
    return { success: false, error: 'Failed to archive property' }
  }
}