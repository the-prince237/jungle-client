import { ViewAccess } from "../entities/ViewAccess"

export interface IViewAccessRepository {
  findById(id: string): Promise<ViewAccess | null>
  findByUserAndContent(userId: string, contentId: string): Promise<ViewAccess | null>
  findByUser(userId: string): Promise<ViewAccess[]>
  hasAccess(userId: string, contentId: string): Promise<boolean>
  incrementViewCount(id: string): Promise<ViewAccess>
  create(access: Omit<ViewAccess, 'id' | 'createdAt'>): Promise<ViewAccess>
}