import { User } from "../entities/User"

export interface IUserRepository {
  findById(id: string): Promise<User | null>
  findByClerkUserId(clerkUserId: string): Promise<User | null>
  findByUsername(username: string): Promise<User | null>
  create(user: Omit<User, 'id' | 'createdAt'>): Promise<User>
  update(id: string, data: Partial<User>): Promise<User>
}