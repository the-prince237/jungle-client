'use client'

import { AdvancedContent } from '@/domain/entities/AdvancedContent'
import { formatPrice } from '@/lib/utils/currency'
import { checkContentAccessAction } from '@/presentation/actions/content.actions'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface ContentCardProps {
  content: AdvancedContent
  propertySlug: string
  userId?: string
}

export function ContentCard({ content, propertySlug, userId }: ContentCardProps) {
  const [hasAccess, setHasAccess] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (userId) {
      checkContentAccessAction(userId, content.id).then(setHasAccess).finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [userId, content.id])

  const href = hasAccess 
    ? `/${propertySlug}/advanced/${content.tag}`
    : `/${propertySlug}/advanced/${content.tag}/pay`

  return (
    <Link href={href} className="block group">
      <div className="border rounded-lg p-6 hover:shadow-lg transition">
        {content.isBundle && (
          <div className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full inline-block mb-3">
            📦 Bundle
          </div>
        )}
        
        <h3 className="font-bold text-lg mb-2">{content.title}</h3>
        {content.description && (
          <p className="text-sm text-gray-600 mb-4">{content.description}</p>
        )}

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            ⏱ {Math.floor(content.durationSeconds / 60)}min
          </span>
          
          {loading ? (
            <span className="text-gray-400">...</span>
          ) : hasAccess ? (
            <span className="text-green-600 font-bold">✓ Accès débloqué</span>
          ) : (
            <span className="text-blue-600 font-bold">
              {formatPrice(content.price, content.currency)}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}