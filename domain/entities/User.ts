export interface User {
  id: string
  clerkUserId: string
  username: string
  email: string
  role: 'buyer' | 'agent' | 'admin'
  avatarUrl?: string
  createdAt: Date
}