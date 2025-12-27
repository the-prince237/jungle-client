import type { IPropertyRepository } from '@/domain/repositories/IPropertyRepository'
import type { Property } from '@/domain/entities/Property'

export class GetPropertyBySlug {
  constructor(private propertyRepo: IPropertyRepository) {}

  async execute(slug: string): Promise<Property | null> {
    return await this.propertyRepo.findBySlug(slug)
  }
}
