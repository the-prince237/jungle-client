import { getPropertiesAction } from '@/presentation/actions/property.actions'
import { SearchFilters } from '@/presentation/components/common'
import { PropertyCard } from '@/presentation/components/properties'

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ 
    city?: string
    minPrice?: string
    maxPrice?: string
    type?: 'rent' | 'sale'
  }>
}) {
  const params = await searchParams
  
  const properties = await getPropertiesAction({
    status: 'active',
    city: params.city,
    minPrice: params.minPrice ? Number(params.minPrice) : undefined,
    maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
    acquisitionType: params.type,
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Rechercher une propriété</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <SearchFilters />
        </aside>

        <div className="lg:col-span-3">
          <p className="text-gray-600 mb-6">
            {properties.length} propriété{properties.length > 1 ? 's' : ''} trouvée{properties.length > 1 ? 's' : ''}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {properties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          {properties.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">
                Aucune propriété ne correspond à vos critères
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}