import { sanityClient } from '../client'
import { QUERIES } from '../queries'
import type { IPaymentRepository } from '@/domain/repositories/IPaymentRepository'
import type { Payment } from '@/domain/entities/Payment'

export class SanityPaymentRepository implements IPaymentRepository {
  async findById(id: string): Promise<Payment | null> {
    return await sanityClient.fetch(QUERIES.PAYMENT_BY_ID, { id })
  }

  async findByUser(userId: string): Promise<Payment[]> {
    return await sanityClient.fetch(QUERIES.PAYMENTS_BY_USER, { userId })
  }

  async findByProviderRef(providerRef: string): Promise<Payment | null> {
    return await sanityClient.fetch(
      `*[_type == "payment" && providerRef == $providerRef][0]`,
      { providerRef }
    )
  }

  async create(payment: Omit<Payment, 'id' | 'createdAt'>): Promise<Payment> {
    const result = await sanityClient.create({
      _type: 'payment',
      userId: { _type: 'reference', _ref: payment.userId },
      amount: payment.amount,
      currency: payment.currency,
      provider: payment.provider,
      providerRef: payment.providerRef,
      status: payment.status,
      createdAt: new Date().toISOString(),
    })
    return this.findById(result._id) as Promise<Payment>
  }

  async updateStatus(id: string, status: Payment['status']): Promise<Payment> {
    await sanityClient.patch(id).set({ status }).commit()
    return this.findById(id) as Promise<Payment>
  }
}
