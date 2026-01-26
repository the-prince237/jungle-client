import { getPropertyBySlugAction } from '@/presentation/actions/property.actions'
import { getPropertyContentAction, checkContentAccessAction } from '@/presentation/actions/content.actions'
import { getCurrentUserAction } from '@/presentation/actions/user.actions'
import { notFound, redirect } from 'next/navigation'
import { VideoPlayer } from '@/presentation/components/common'

export default async function ContentViewPage({
  params,
}: {
  params: Promise<{ propertyUrlSlug: string; contentTag: string }>
}) {
  const { propertyUrlSlug, contentTag } = await params
  const property = await getPropertyBySlugAction(propertyUrlSlug)
  const currentUser = await getCurrentUserAction()

  if (!property) notFound()
  if (!currentUser) redirect('/auth/sign-in')

  const contents = await getPropertyContentAction(property.id)
  const content = contents.find(c => c.tag === contentTag)

  if (!content) notFound()

  // Vérifier l'accès
  const hasAccess = await checkContentAccessAction(currentUser.id, content.id)

  if (!hasAccess) {
    redirect(`/${propertyUrlSlug}/advanced/${contentTag}/pay`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <a href={`/${propertyUrlSlug}/advanced`} className="text-primary hover:underline mb-4 inline-block">
        ← Retour aux preuves
      </a>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{content.title}</h1>
        {content.description && (
          <p className="text-gray-600 mb-6">{content.description}</p>
        )}

        <VideoPlayer
          videoUrl={content.videoUrl}
          contentId={content.id}
          userId={currentUser.id}
        />

        <div className="mt-8 bg-gray-50 p-6 rounded-lg">
          <h3 className="font-bold mb-2">À propos de cette vidéo</h3>
          <p className="text-sm text-gray-600">
            Durée: {Math.floor(content.durationSeconds / 60)}min {content.durationSeconds % 60}s
          </p>
        </div>
      </div>
    </div>
  )
}