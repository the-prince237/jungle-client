import { getCurrentUserAction } from '@/presentation/actions/user.actions'
import { getPropertiesAction } from '@/presentation/actions/property.actions'
import { redirect } from 'next/navigation'
import { PropertyManageCard } from '@/presentation/components/properties'
export default async function MyPropertiesPage() {
  const currentUser = await getCurrentUserAction()

  if (!currentUser) redirect('/auth/sign-in')

  const properties = await getPropertiesAction({
    ownerId: currentUser.id,
    status: 'active',
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Mes propriétés</h1>
        <a 
          href="/new"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          + Nouvelle annonce
        </a>
      </div>

      {properties.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {properties.map(property => (
            <PropertyManageCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 mb-4">
            Vous n'avez pas encore de propriétés
          </p>
          <a href="/new" className="text-blue-600 hover:underline">
            Créer votre première annonce
          </a>
        </div>
      )}
    </div>
  )
}
