'use server'

import { auth } from '@clerk/nextjs/server'
import { SanityUserRepository } from '@/infrastructure/sanity/repositories/SanityUserRepository'

const userRepo = new SanityUserRepository()

export async function getCurrentUserAction() {
  try {
    const { userId } = await auth()
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

export async function syncClerkUserAction(clerkUser: any) {
  try {
    const existing = await userRepo.findByClerkUserId(clerkUser.id)
    if (existing) return existing

    return await userRepo.create({
      clerkUserId: clerkUser.id,
      username: clerkUser.username || clerkUser.emailAddresses[0].emailAddress.split('@')[0],
      email: clerkUser.emailAddresses[0].emailAddress,
      role: 'buyer',
      avatarUrl: clerkUser.imageUrl,
    })
  } catch (error) {
    console.error('Error syncing user:', error)
    throw error
  }
}
