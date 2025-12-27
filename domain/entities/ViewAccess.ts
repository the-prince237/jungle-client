import { AdvancedContent } from "./AdvancedContent"
import { Payment } from "./Payment"
import { User } from "./User"

export interface ViewAccess {
  id: string
  userId: string
  user?: User
  contentId: string
  content?: AdvancedContent
  paymentId: string
  payment?: Payment
  expiresAt?: Date
  viewCount: number
  maxViews: number
  createdAt: Date
}
