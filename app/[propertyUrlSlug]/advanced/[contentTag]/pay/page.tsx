import { getPropertyBySlugAction } from '@/presentation/actions/property.actions'
import { getPropertyContentAction } from '@/presentation/actions/content.actions'
import { getCurrentUserAction } from '@/presentation/actions/user.actions'
import { notFound, redirect } from 'next/navigation'
import { formatPrice } from '@/lib/utils/currency'
import { PaymentForm } from '@/presentation/components/common'

export default async function PaymentPage({
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Paiement requis</h1>

        <div className="bg-white border rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-2">{content.title}</h2>
          <p className="text-gray-600 mb-4">{content.description}</p>
          
          <div className="flex justify-between items-center py-4 border-t">
            <span className="font-bold">Prix</span>
            <span className="text-2xl font-bold text-blue-600">
              {formatPrice(content.price, content.currency)}
            </span>
          </div>

          {content.isBundle && (
            <div className="bg-purple-50 p-4 rounded-lg mt-4">
              <p className="text-sm text-purple-800">
                ✨ Ce bundle inclut toutes les vidéos de preuve pour cette propriété
              </p>
            </div>
          )}
        </div>

        <PaymentForm
          contentId={content.id}
          userId={currentUser.id}
          amount={content.price}
          currency={content.currency}
          returnUrl={`/${propertyUrlSlug}/advanced/${contentTag}`}
        />
      </div>
    </div>
  )
}