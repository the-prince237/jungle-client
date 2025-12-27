export { SanityUserRepository } from '@/infrastructure/sanity/repositories/SanityUserRepository'
export { SanityPropertyRepository } from '@/infrastructure/sanity/repositories/SanityPropertyRepository'
export { SanityAdvancedContentRepository } from '@/infrastructure/sanity/repositories/SanityAdvancedContentRepository'
export { SanityViewAccessRepository } from '@/infrastructure/sanity/repositories/SanityViewAccessRepository'
export { SanityPaymentRepository } from '@/infrastructure/sanity/repositories/SanityPaymentRepository'

// src/lib/di-container.ts (Dependency Injection)
import { SanityUserRepository } from './repositories'
import { SanityPropertyRepository } from './repositories'
import { SanityAdvancedContentRepository } from './repositories'
import { SanityViewAccessRepository } from './repositories'
import { SanityPaymentRepository } from './repositories'

export const repositories = {
  user: new SanityUserRepository(),
  property: new SanityPropertyRepository(),
  content: new SanityAdvancedContentRepository(),
  viewAccess: new SanityViewAccessRepository(),
  payment: new SanityPaymentRepository(),
}
