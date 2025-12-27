import { getCurrentUserAction } from '@/presentation/actions/user.actions'
import { getPropertiesAction } from '@/presentation/actions/property.actions'
import { redirect } from 'next/navigation'
import { PropertyCard } from '@/presentation/components/properties'

export default async function ArchivesPage() {
  const currentUser = await getCurrentUserAction()

  if (!currentUser) redirect('/auth/sign-in')

  const archives = await getPropertiesAction({
    ownerId: currentUser.id,
    status: 'archived',
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">📦 Mes archives</h1>

      {archives.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {archives.map(property => (
            <PropertyCard key={property.id} property={property} showArchived />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 py-12">
          Aucune propriété archivée
        </p>
      )}
    </div>
  )
}