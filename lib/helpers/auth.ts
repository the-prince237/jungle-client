import { auth } from '@clerk/nextjs/server'
import { getUserByClerkUserIdAction } from '@/presentation/actions/user.actions'

export async function getCurrentUser() {
  const { userId } = await auth()
  if (!userId) return null
  
  return await getUserByClerkUserIdAction(userId)
}

export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error('Unauthorized')
  }
  return user
}

export async function requireRole(role: 'agent' | 'admin') {
  const user = await requireAuth()
  if (user.role !== role && user.role !== 'admin') {
    throw new Error('Forbidden')
  }
  return user
}