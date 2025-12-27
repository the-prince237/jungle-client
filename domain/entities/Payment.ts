import { User } from "./User"

export interface Payment {
  id: string
  userId: string
  user?: User
  amount: number
  currency: string
  provider: 'stripe' | 'mobile_money' | 'paypal'
  providerRef: string
  status: 'pending' | 'paid' | 'failed'
  createdAt: Date
}