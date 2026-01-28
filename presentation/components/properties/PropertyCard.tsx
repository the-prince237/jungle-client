import { Property } from '@/domain/entities/Property'
import { formatPrice } from '@/lib/utils/currency'
import Link from 'next/link'

interface PropertyCardProps {
  property: Property
  showArchived?: boolean
}

export function PropertyCard({ property, showArchived }: PropertyCardProps) {
  return (
    <Link href={`/${property.slug}`} className="block group w-full">
      <div className="border md:rounded-lg w-full overflow-hidden shadow-lg transition">
        <div className="relative h-auto">
          <img
            src={property.coverImageUrl}
            alt={property.title}
            className="w-full aspect-4/3 object-cover group-hover:scale-105 transition"
          />
          {showArchived && (
            <div className="absolute top-2 right-2 bg-gray-800 text-white px-3 py-1 rounded-full text-sm">
              📦 Archivé
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 line-clamp-1">
            {property.title}
          </h3>
          
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {property.description}
          </p>
          
          <div className="flex justify-between items-center">
            <span className="text-primary font-bold text-xl">
              {formatPrice(property.price, property.currency)}
            </span>
            <span className="text-sm text-gray-600">
              {property.acquisitionType === 'rent' ? '📍 Location' : '🏠 Vente'}
            </span>
          </div>
          
          <div className="mt-3 text-sm text-gray-500">
            📍 {property.location.city}, {property.location.area}
          </div>
        </div>
      </div>
    </Link>
  )
}