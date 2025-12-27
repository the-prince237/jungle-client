import { getUserByUsernameAction } from '@/presentation/actions/user.actions'
import { getPropertiesAction } from '@/presentation/actions/property.actions'
import { notFound } from 'next/navigation'
import { PropertyCard } from '@/presentation/components/properties'

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ userUsername: string }>
}) {
  const { userUsername } = await params
  const user = await getUserByUsernameAction(userUsername)

  if (!user) notFound()

  const properties = await getPropertiesAction({
    ownerId: user.id,
    status: 'active',
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-6 mb-8">
        {user.avatarUrl && (
          <img 
            src={user.avatarUrl} 
            alt={user.username}
            className="w-24 h-24 rounded-full object-cover"
          />
        )}
        <div>
          <h1 className="text-3xl font-bold">{user.username}</h1>
          <p className="text-gray-600">
            {user.role === 'agent' ? '🏢 Agent immobilier' : '👤 Utilisateur'}
          </p>
        </div>
      </div>

      <section>
        <h2 className="text-2xl font-bold mb-6">
          Propriétés de {user.username} ({properties.length})
        </h2>
        
        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">Aucune propriété publiée</p>
        )}
      </section>
    </div>
  )
}