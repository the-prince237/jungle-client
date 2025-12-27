import { createImageUrlBuilder } from '@sanity/image-url'
import { sanityClient } from '@/infrastructure/sanity/client'

const builder = createImageUrlBuilder(sanityClient)

export function urlFor(source: any) {
  return builder.image(source)
}

// src/lib/utils/currency.ts
export function formatPrice(price: number, currency: string): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency,
  }).format(price)
}
