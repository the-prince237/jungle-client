import { getPropertyBySlugAction } from '@/presentation/actions/property.actions'
import { getPropertyContentAction } from '@/presentation/actions/content.actions'
import { notFound } from 'next/navigation'
import { formatPrice } from '@/lib/utils/currency'
import { Gallery } from '@/presentation/components/common'

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ propertyUrlSlug: string }>
}) {
  const { propertyUrlSlug } = await params
  const property = await getPropertyBySlugAction(propertyUrlSlug)

  if (!property) notFound()

  const advancedContent = await getPropertyContentAction(property.id)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Gallery images={[property.coverImageUrl, ...property.galleryUrls]} />
          
          <div className="mt-8">
            <h1 className="text-4xl font-bold mb-4">{property.title}</h1>
            
            <div className="flex items-center gap-4 text-gray-600 mb-6">
              <span>📍 {property.location.city}, {property.location.area}</span>
              <span>•</span>
              <span>{property.acquisitionType === 'rent' ? 'Location' : 'Vente'}</span>
            </div>

            <div className="prose max-w-none">
              <p>{property.description}</p>
            </div>
          </div>
        </div>

        <aside className="lg:col-span-1 text-gray-700">
          <div className="bg-white border rounded-lg p-6 sticky top-4">
            <p className="text-3xl font-bold mb-4">
              {formatPrice(property.price, property.currency)}
            </p>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Propriétaire</span>
                <a href={`/profile/${property.owner?.username}`} className="text-primary hover:underline">
                  {property.owner?.username}
                </a>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Type</span>
                <span>{property.acquisitionType === 'rent' ? 'Location' : 'Vente'}</span>
              </div>
            </div>

            <button className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary mb-3">
              Contacter le propriétaire
            </button>

            {advancedContent.length > 0 && (
              <a 
                href={`/${propertyUrlSlug}/advanced`}
                className="block w-full bg-purple-600 text-white py-3 rounded-lg text-center hover:bg-purple-700"
              >
                🎥 Voir les preuves vidéo ({advancedContent.length})
              </a>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}