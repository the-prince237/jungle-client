import { getPropertyBySlugAction } from '@/presentation/actions/property.actions'
import { notFound } from 'next/navigation'

export default async function PropertyPage({ 
  params 
}: { 
  params: Promise<{ propertyUrlSlug: string }> 
}) {
  const { propertyUrlSlug } = await params
  const property = await getPropertyBySlugAction(propertyUrlSlug)

  if (!property) notFound()

  return (
    <div>
      <h1>{property.title}</h1>
      <p>{property.description}</p>
    </div>
  )
}
