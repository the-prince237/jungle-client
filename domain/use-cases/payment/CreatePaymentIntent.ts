import type { IPaymentRepository } from '@/domain/repositories/IPaymentRepository'
import type { IAdvancedContentRepository } from '@/domain/repositories/IAdvancedContentRepository'
import type { Payment } from '@/domain/entities/Payment'

export class CreatePaymentIntent {
  constructor(
    private paymentRepo: IPaymentRepository,
    private contentRepo: IAdvancedContentRepository
  ) {}

  async execute(userId: string, contentId: string): Promise<Payment> {
    const content = await this.contentRepo.findById(contentId)
    if (!content) throw new Error('Content not found')

    // Créer le paiement en statut pending
    return await this.paymentRepo.create({
      userId,
      amount: content.price,
      currency: content.currency,
      provider: 'stripe',
      providerRef: `temp_${Date.now()}`, // À remplacer par Stripe payment intent ID
      status: 'pending',
    })
  }
}
