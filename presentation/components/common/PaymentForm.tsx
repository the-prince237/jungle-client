'use client'

import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { createPaymentIntentAction } from '@/presentation/actions/payment.actions'
import { useState, useEffect } from 'react'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface PaymentFormProps {
  contentId: string
  userId: string
  amount: number
  currency: string
  returnUrl: string
}

export function PaymentForm(props: PaymentFormProps) {
  const [clientSecret, setClientSecret] = useState<string>('')

  useEffect(() => {
    createPaymentIntentAction(props.userId, props.contentId).then(result => {
      if (result.success && result.clientSecret) {
        setClientSecret(result.clientSecret)
      }
    })
  }, [props.userId, props.contentId])

  if (!clientSecret) {
    return <div className="text-center py-8">Chargement du formulaire de paiement...</div>
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm {...props} />
    </Elements>
  )
}

function CheckoutForm({ returnUrl }: { returnUrl: string }) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) return

    setIsProcessing(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}${returnUrl}`,
      },
    })

    if (error) {
      setMessage(error.message || 'Une erreur est survenue')
    }

    setIsProcessing(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      
      {message && (
        <div className="p-4 bg-red-50 text-red-800 rounded-lg">
          {message}
        </div>
      )}

      <button
        type="submit"
        disabled={isProcessing || !stripe}
        className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary disabled:opacity-50"
      >
        {isProcessing ? 'Traitement...' : 'Payer maintenant'}
      </button>
    </form>
  )
}