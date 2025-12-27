'use server'

import { auth, User } from '@clerk/nextjs/server'
import { SanityUserRepository } from '@/infrastructure/sanity/repositories/SanityUserRepository'

const userRepo = new SanityUserRepository()

export async function getCurrentUserAction() {
  try {
    const { userId } = await auth()
    console.log({ userId })
    if (!userId) return null
    return await userRepo.findByClerkUserId(userId)
  } catch (error) {
    console.error('Error fetching current user:', error)
    return null
  }
}

export async function getUserByUsernameAction(username: string) {
  try {
    return await userRepo.findByUsername(username)
  } catch (error) {
    console.error('Error fetching user:', error)
    return null
  }
}

export async function getUserByClerkUserIdAction(clerkUserId: string) {
  try {
    return await userRepo.findByClerkUserId(clerkUserId)
  } catch (error) {
    console.error('Error fetching user by Clerk ID:', error)
    return null
  }
}

export async function syncClerkUserAction(clerkUser: any) {
  try {
    const existing = await userRepo.findByClerkUserId(clerkUser.id)
    if (existing) return existing

    const email = clerkUser.email_addresses[0]?.email_address;

    return await userRepo.create({
      clerkUserId: clerkUser.id,
      username: clerkUser.username || email?.split('@')[0] || `user${Date.now()}`,
      email: email,
      role: 'buyer',
      avatarUrl: clerkUser.imageUrl,
    })
  } catch (error) {
    console.error('Error syncing user:', error)
    throw error
  }
}
