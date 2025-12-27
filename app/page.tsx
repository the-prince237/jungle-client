import { getPropertiesAction } from '@/presentation/actions/property.actions'
import { PropertyCard } from '@/presentation/components/properties'

export default async function HomePage() {
  const properties = await getPropertiesAction({ status: 'active' })

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Trouvez votre propriété idéale
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Des milliers d'annonces vérifiées au Cameroun
        </p>
        <a 
          href="/search" 
          className="bg-blue-600 text-white px-8 py-3 rounded-lg inline-block hover:bg-blue-700"
        >
          Commencer la recherche
        </a>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Dernières annonces</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.slice(0, 6).map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>
    </div>
  )
}