import { formatPrice } from '@/lib/utils/currency'
import { getPropertiesAction } from '@/presentation/actions/property.actions'

export default async function HomePage() {
  const properties = await getPropertiesAction({ status: 'active' })

  return (
    <div>
      <h1>Properties</h1>
      {properties.map(property => (
        <div key={property.id}>
          <h2>{property.title}</h2>
          <p>{formatPrice(property.price, property.currency)}</p>
        </div>
      ))}
    </div>
  )
}
