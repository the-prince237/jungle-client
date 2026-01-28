import { getCurrentUserAction } from '@/presentation/actions/user.actions'
import { getPropertiesAction } from '@/presentation/actions/property.actions'
import { redirect } from 'next/navigation'
import { PropertyManageCard } from '@/presentation/components/properties'
import Link from 'next/link'
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
        <Link
          href="/new"
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary"
        >
          + Nouvelle annonce
        </Link>
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
          <Link href="/new" className="text-primary hover:underline">
            Créer votre première annonce
          </Link>
        </div>
      )}
    </div>
  )
}
