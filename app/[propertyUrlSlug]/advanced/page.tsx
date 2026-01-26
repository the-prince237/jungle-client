import { getPropertyBySlugAction } from '@/presentation/actions/property.actions'
import { getPropertyContentAction } from '@/presentation/actions/content.actions'
import { getCurrentUserAction } from '@/presentation/actions/user.actions'
import { notFound } from 'next/navigation'
import { ContentCard } from '@/presentation/components/content'

export default async function AdvancedContentPage({
  params,
}: {
  params: Promise<{ propertyUrlSlug: string }>
}) {
  const { propertyUrlSlug } = await params
  const property = await getPropertyBySlugAction(propertyUrlSlug)
  const currentUser = await getCurrentUserAction()

  if (!property) notFound()

  const contents = await getPropertyContentAction(property.id)
  const bundles = contents.filter(c => c.isBundle)
  const individual = contents.filter(c => !c.isBundle)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <a href={`/${propertyUrlSlug}`} className="text-primary hover:underline mb-4 inline-block">
          ← Retour à la propriété
        </a>
        <h1 className="text-3xl font-bold mb-2">Preuves vidéo détaillées</h1>
        <p className="text-gray-600">
          Accédez aux vidéos de vérification pour {property.title}
        </p>
      </div>

      {bundles.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">📦 Offres groupées</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bundles.map(content => (
              <ContentCard
                key={content.id} 
                content={content} 
                propertySlug={propertyUrlSlug}
                userId={currentUser?.id}
              />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-2xl font-bold mb-4">🎥 Vidéos individuelles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {individual.map(content => (
            <ContentCard 
              key={content.id} 
              content={content} 
              propertySlug={propertyUrlSlug}
              userId={currentUser?.id}
            />
          ))}
        </div>
      </section>

      {contents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">
            Aucune preuve vidéo disponible pour cette propriété
          </p>
        </div>
      )}
    </div>
  )
}