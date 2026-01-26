import { HomeHero } from '@/presentation'
import { getPropertiesAction } from '@/presentation/actions/property.actions'
import { PropertyCard } from '@/presentation/components/properties'

export default async function HomePage() {
  const properties = await getPropertiesAction({ status: 'active' })

  return (
    <div className="mx-auto flex flex-col gap-20 lg:gap-50 pb-8">
      <HomeHero />

      <section className='flex flex-col items-center w-full'>
        <h2 className="text-5xl font-bold mb-6">Dernières annonces</h2>
        <div id='properties' className="w-full padded-x grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.slice(0, 6).map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>
    </div>
  )
}