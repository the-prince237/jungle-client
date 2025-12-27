import { getCurrentUserAction } from '@/presentation/actions/user.actions'
import { redirect } from 'next/navigation'
import { ProfileEditForm } from '@/presentation/components/common'

export default async function SettingsProfilePage() {
  const currentUser = await getCurrentUserAction()

  if (!currentUser) redirect('/auth/sign-in')

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Modifier mon profil</h1>
      <div className="max-w-2xl">
        <ProfileEditForm user={currentUser} />
      </div>
    </div>
  )
}
