'use client'

import { Property } from '@/domain/entities/Property'
import { formatPrice } from '@/lib/utils/currency'
import { archivePropertyAction } from '@/presentation/actions/property.actions'
import { useState } from 'react'
import Link from 'next/link'

interface PropertyManageCardProps {
  property: Property
}

export function PropertyManageCard({ property }: PropertyManageCardProps) {
  const [isArchiving, setIsArchiving] = useState(false)

  const handleArchive = async () => {
    if (!confirm('Voulez-vous vraiment archiver cette propriété ?')) return
    
    setIsArchiving(true)
    const result = await archivePropertyAction(property.id)
    
    if (result.success) {
      window.location.reload()
    } else {
      alert('Erreur lors de l\'archivage')
      setIsArchiving(false)
    }
  }

  return (
    <div className="border rounded-lg p-6 hover:shadow-md transition">
      <div className="flex gap-6">
        <img
          src={property.coverImageUrl}
          alt={property.title}
          className="w-32 h-32 object-cover rounded-lg"
        />
        
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold text-xl">{property.title}</h3>
              <p className="text-sm text-gray-600">
                📍 {property.location.city}, {property.location.area}
              </p>
            </div>
            <span className="text-xl font-bold text-primary">
              {formatPrice(property.price, property.currency)}
            </span>
          </div>

          <p className="text-gray-600 mb-4 line-clamp-2">
            {property.description}
          </p>

          <div className="flex gap-3">
            <Link
              href={`/${property.slug}`}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary"
            >
              👁 Voir
            </Link>
            
            <Link
              href={`/profile/me/${property.slug}`}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              ✏️ Modifier
            </Link>
            
            <button
              onClick={handleArchive}
              disabled={isArchiving}
              className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 disabled:opacity-50"
            >
              {isArchiving ? '...' : '📦 Archiver'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}