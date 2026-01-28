import { HomeHero } from '@/presentation'

export default function HomePage() {
  // const properties = await getPropertiesAction({ status: 'active' })

  return (
    <div className="mx-auto overflow-x-hidden flex flex-col gap-20 lg:gap-50 pb-8">
      <HomeHero />
      {/* <section className='relative padded-x'>
        <div className='relative w-full rounded-lg overflow-hidden h-96'>
          <NeuralBackground color='#00b800' />
        </div>
      </section> */}
      {/* <section id='properties' className='flex padded-x flex-col items-center w-full'>
        <h2 className="text-5xl font-bold mb-6">Annonces</h2>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.slice(0, 6).map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section> */}
    </div>
  )
}