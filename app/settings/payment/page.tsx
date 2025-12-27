import { getCurrentUserAction } from '@/presentation/actions/user.actions'
import { SanityPaymentRepository } from '@/infrastructure/sanity/repositories/SanityPaymentRepository'
import { redirect } from 'next/navigation'
import { formatPrice } from '@/lib/utils/currency'

export default async function SettingsPaymentPage() {
  const currentUser = await getCurrentUserAction()

  if (!currentUser) redirect('/auth/sign-in')

  const paymentRepo = new SanityPaymentRepository()
  const payments = await paymentRepo.findByUser(currentUser.id)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Historique des paiements</h1>

      <div className="max-w-4xl">
        {payments.length > 0 ? (
          <div className="space-y-4">
            {payments.map(payment => (
              <div key={payment.id} className="border rounded-lg p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold">
                      {formatPrice(payment.amount, payment.currency)}
                    </p>
                    <p className="text-sm text-gray-600">
                      {new Date(payment.createdAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    payment.status === 'paid' ? 'bg-green-100 text-green-800' :
                    payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {payment.status === 'paid' ? '✓ Payé' :
                     payment.status === 'pending' ? '⏳ En attente' :
                     '✗ Échoué'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 py-12">
            Aucun paiement effectué
          </p>
        )}
      </div>
    </div>
  )
}