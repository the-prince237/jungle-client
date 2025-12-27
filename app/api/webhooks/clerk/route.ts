import { NextRequest, NextResponse } from 'next/server'
import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { syncClerkUserAction } from '@/presentation/actions/user.actions'

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET!

export async function POST(req: NextRequest) {
  // Récupérer les headers
  const headerPayload = await headers()
  const svixId = headerPayload.get('svix-id')
  const svixTimestamp = headerPayload.get('svix-timestamp')
  const svixSignature = headerPayload.get('svix-signature')

  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json({ error: 'Missing headers' }, { status: 400 })
  }

  // Récupérer le body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Vérifier la signature
  const wh = new Webhook(webhookSecret)
  let evt: any

  try {
    evt = wh.verify(body, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    })
  } catch (err) {
    console.error('Webhook verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // Gérer les événements
  const { type, data } = evt

  try {
    switch (type) {
      case 'user.created':
        // Synchroniser le nouvel utilisateur avec Sanity
        await syncClerkUserAction(data)
        console.log('User synced:', data.id)
        break

      case 'user.updated':
        // Mettre à jour l'utilisateur dans Sanity
        console.log('User updated:', data.id)
        // TODO: Implémenter la mise à jour
        break

      case 'user.deleted':
        // Gérer la suppression (optionnel)
        console.log('User deleted:', data.id)
        break

      default:
        console.log('Unhandled event type:', type)
    }

    return NextResponse.json({ message: 'Webhook processed' }, { status: 200 })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 })
  }
}