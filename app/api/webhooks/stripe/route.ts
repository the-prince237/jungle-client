import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { headers } from 'next/headers'
import { SanityPaymentRepository } from '@/infrastructure/sanity/repositories/SanityPaymentRepository'
import { SanityViewAccessRepository } from '@/infrastructure/sanity/repositories/SanityViewAccessRepository'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
})

const paymentRepo = new SanityPaymentRepository()
const viewAccessRepo = new SanityViewAccessRepository()

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = (await headers()).get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // Gérer les événements
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent
    
    // Trouver le paiement
    const payment = await paymentRepo.findByProviderRef(paymentIntent.id)
    if (!payment) {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 })
    }

    // Mettre à jour le statut
    await paymentRepo.updateStatus(payment.id, 'paid')

    // Créer le ViewAccess
    const { userId, contentId, isBundle } = paymentIntent.metadata
    
    if (isBundle === 'true') {
      // TODO: Créer plusieurs ViewAccess pour toutes les vidéos
    } else {
      await viewAccessRepo.create({
        userId,
        contentId,
        paymentId: payment.id,
        viewCount: 0,
        maxViews: 1,
      })
    }
  }

  return NextResponse.json({ received: true })
}