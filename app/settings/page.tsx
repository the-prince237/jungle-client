import { getCurrentUserAction } from '@/presentation/actions/user.actions'
import { redirect } from 'next/navigation'

export default async function SettingsPage() {
  const currentUser = await getCurrentUserAction()

  if (!currentUser) redirect('/auth/sign-in')

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Paramètres</h1>

      <div className="max-w-2xl">
        <nav className="space-y-2">
          <a 
            href="/settings/profile"
            className="block p-4 border rounded-lg hover:bg-gray-50"
          >
            <h3 className="font-bold">👤 Profil</h3>
            <p className="text-sm text-gray-600">
              Modifier vos informations personnelles
            </p>
          </a>

          <a 
            href="/settings/payment"
            className="block p-4 border rounded-lg hover:bg-gray-50"
          >
            <h3 className="font-bold">💳 Paiements</h3>
            <p className="text-sm text-gray-600">
              Gérer vos moyens de paiement
            </p>
          </a>
        </nav>
      </div>
    </div>
  )
}