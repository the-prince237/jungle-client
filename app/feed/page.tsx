import { getPropertiesAction } from '@/presentation/actions/property.actions'
import { SearchFilters } from '@/presentation/components/common'
import { PropertyCard } from '@/presentation/components/properties'
import { Filter } from 'lucide-react'

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
    <div className='w-full bg-gray-50'>
      <SearchFilters />
      <section id='properties' className='flex md:pt-5 w-full lg:w-[calc(100vw-320px)]  xl:w-[calc(100vw-400px)] ml-auto right-0'>
        <div className='w-full relative flex padded-x-2'>          
          <div className="grid w-full grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-1 md:gap-6">
            {[...properties, ...properties, ...properties].map(property => (
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
      </section>
    </div>
  )
}