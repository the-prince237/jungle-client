import type { IViewAccessRepository } from '@/domain/repositories/IViewAccessRepository'

export class CheckViewAccess {
  constructor(private viewAccessRepo: IViewAccessRepository) {}

  async execute(userId: string, contentId: string): Promise<boolean> {
    return await this.viewAccessRepo.hasAccess(userId, contentId)
  }
}
