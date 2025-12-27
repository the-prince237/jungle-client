import { sanityClient } from '../client'
import { QUERIES } from '../queries'
import type { IUserRepository } from '@/domain/repositories/IUserRepository'
import type { User } from '@/domain/entities/User'

export class SanityUserRepository implements IUserRepository {
  async findById(id: string): Promise<User | null> {
    return await sanityClient.fetch(QUERIES.USER_BY_ID, { id })
  }

  async findByClerkUserId(clerkUserId: string): Promise<User | null> {
    return await sanityClient.fetch(QUERIES.USER_BY_CLERK_ID, { clerkUserId })
  }

  async findByUsername(username: string): Promise<User | null> {
    return await sanityClient.fetch(QUERIES.USER_BY_USERNAME, { username })
  }

  async create(user: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const result = await sanityClient.create({
      _type: 'user',
      clerkUserId: user.clerkUserId,
      username: { _type: 'slug', current: user.username },
      email: user.email,
      role: user.role,
      avatarUrl: user.avatarUrl,
      createdAt: new Date().toISOString(),
    })
    return this.findById(result._id) as Promise<User>
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    await sanityClient.patch(id).set({
      ...(data.email && { email: data.email }),
      ...(data.username && { username: { _type: 'slug', current: data.username } }),
      ...(data.role && { role: data.role }),
      ...(data.avatarUrl && { avatarUrl: data.avatarUrl }),
    }).commit()
    return this.findById(id) as Promise<User>
  }
}
