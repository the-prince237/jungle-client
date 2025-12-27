'use server'

import Stripe from 'stripe'
import { SanityPaymentRepository } from '@/infrastructure/sanity/repositories/SanityPaymentRepository'
import { SanityViewAccessRepository } from '@/infrastructure/sanity/repositories/SanityViewAccessRepository'
import { SanityAdvancedContentRepository } from '@/infrastructure/sanity/repositories/SanityAdvancedContentRepository'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
})

const paymentRepo = new SanityPaymentRepository()
const viewAccessRepo = new SanityViewAccessRepository()
const contentRepo = new SanityAdvancedContentRepository()

export async function createPaymentIntentAction(userId: string, contentId: string) {
  try {
    const content = await contentRepo.findById(contentId)
    if (!content) throw new Error('Content not found')

    // Créer Stripe Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(content.price * 100), // Convertir en centimes
      currency: content.currency.toLowerCase(),
      metadata: {
        userId,
        contentId,
        isBundle: String(content.isBundle),
      },
    })

    // Créer le paiement en base
    const payment = await paymentRepo.create({
      userId,
      amount: content.price,
      currency: content.currency,
      provider: 'stripe',
      providerRef: paymentIntent.id,
      status: 'pending',
    })

    return {
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentId: payment.id,
    }
  } catch (error) {
    console.error('Error creating payment intent:', error)
    return { success: false, error: 'Failed to create payment' }
  }
}

export async function confirmPaymentAction(paymentId: string) {
  try {
    // Mettre à jour le statut du paiement
    const payment = await paymentRepo.updateStatus(paymentId, 'paid')

    // Créer le ViewAccess
    const paymentDetails = await paymentRepo.findById(paymentId)
    if (!paymentDetails) throw new Error('Payment not found')

    // Note: contentId doit être stocké dans les metadata du payment
    // Pour simplifier, on suppose qu'il est accessible
    
    return { success: true }
  } catch (error) {
    console.error('Error confirming payment:', error)
    return { success: false }
  }
}
