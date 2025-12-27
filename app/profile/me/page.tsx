import { getCurrentUserAction } from '@/presentation/actions/user.actions'
import { redirect } from 'next/navigation'

export default async function MyProfilePage() {
  const currentUser = await getCurrentUserAction()

  if (!currentUser) redirect('/auth/sign-in')

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Mon profil</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <a 
          href="/profile/me/my-properties"
          className="p-6 border rounded-lg hover:border-blue-500"
        >
          <h3 className="text-xl font-bold mb-2">🏠 Mes propriétés</h3>
          <p className="text-gray-600">Gérer mes annonces</p>
        </a>

        <a 
          href="/settings/profile"
          className="p-6 border rounded-lg hover:border-blue-500"
        >
          <h3 className="text-xl font-bold mb-2">⚙️ Paramètres</h3>
          <p className="text-gray-600">Modifier mon profil</p>
        </a>

        <a 
          href="/settings/payment"
          className="p-6 border rounded-lg hover:border-blue-500"
        >
          <h3 className="text-xl font-bold mb-2">💳 Paiements</h3>
          <p className="text-gray-600">Historique des transactions</p>
        </a>
      </div>
    </div>
  )
}
