import { AdvancedContent } from "../entities/AdvancedContent"

export interface IAdvancedContentRepository {
  findById(id: string): Promise<AdvancedContent | null>
  findByProperty(propertyId: string): Promise<AdvancedContent[]>
  findByTag(propertyId: string, tag: string): Promise<AdvancedContent | null>
  findBundles(propertyId: string): Promise<AdvancedContent[]>
  create(content: Omit<AdvancedContent, 'id' | 'createdAt'>): Promise<AdvancedContent>
  update(id: string, data: Partial<AdvancedContent>): Promise<AdvancedContent>
  delete(id: string): Promise<void>
}