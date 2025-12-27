import { Payment } from "../entities/Payment"

export interface IPaymentRepository {
  findById(id: string): Promise<Payment | null>
  findByUser(userId: string): Promise<Payment[]>
  findByProviderRef(providerRef: string): Promise<Payment | null>
  create(payment: Omit<Payment, 'id' | 'createdAt'>): Promise<Payment>
  updateStatus(id: string, status: Payment['status']): Promise<Payment>
}
