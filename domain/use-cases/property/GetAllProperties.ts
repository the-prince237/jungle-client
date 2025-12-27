import type { IPropertyRepository, PropertyFilters } from '@/domain/repositories/IPropertyRepository'
import type { Property } from '@/domain/entities/Property'

export class GetAllProperties {
  constructor(private propertyRepo: IPropertyRepository) {}

  async execute(filters?: PropertyFilters): Promise<Property[]> {
    return await this.propertyRepo.findAll(filters)
  }
}