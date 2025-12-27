import { getCurrentUserAction } from '@/presentation/actions/user.actions'
import { PropertyForm } from '@/presentation/components/properties'
import { redirect } from 'next/navigation'

export default async function NewPropertyPage() {
  const currentUser = await getCurrentUserAction()

  if (!currentUser) redirect('/auth/sign-in')
  if (currentUser.role === 'buyer') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Accès refusé</h1>
          <p className="text-gray-600">
            Seuls les agents et administrateurs peuvent créer des annonces.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Créer une nouvelle annonce</h1>
        <PropertyForm userId={currentUser.id} />
      </div>
    </div>
  )
}