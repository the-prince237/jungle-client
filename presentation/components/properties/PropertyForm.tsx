'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface PropertyFormProps {
  userId: string
  initialData?: any
}

export function PropertyForm({ userId, initialData }: PropertyFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      ownerId: userId,
      title: formData.get('title') as string,
      slug: (formData.get('title') as string).toLowerCase().replace(/\s+/g, '-'),
      description: formData.get('description') as string,
      price: Number(formData.get('price')),
      currency: formData.get('currency') as string,
      acquisitionType: formData.get('acquisitionType') as 'rent' | 'sale',
      status: 'active' as const,
      location: {
        country: formData.get('country') as string,
        city: formData.get('city') as string,
        area: formData.get('area') as string,
      },
      coverImageUrl: formData.get('coverImageUrl') as string,
      galleryUrls: [],
    }

    // TODO: Appeler l'action de création
    console.log('Creating property:', data)
    
    setIsSubmitting(false)
    router.push('/profile/me/my-properties')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block font-bold mb-2">Titre *</label>
        <input
          type="text"
          name="title"
          required
          minLength={10}
          maxLength={100}
          className="w-full border rounded-lg px-4 py-2"
          placeholder="Belle villa avec piscine à Bastos"
        />
      </div>

      <div>
        <label className="block font-bold mb-2">Description *</label>
        <textarea
          name="description"
          required
          minLength={50}
          rows={6}
          className="w-full border rounded-lg px-4 py-2"
          placeholder="Décrivez la propriété en détail..."
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block font-bold mb-2">Prix *</label>
          <input
            type="number"
            name="price"
            required
            min={0}
            step={0.01}
            className="w-full border rounded-lg px-4 py-2"
            placeholder="150000"
          />
        </div>

        <div>
          <label className="block font-bold mb-2">Devise *</label>
          <select
            name="currency"
            required
            className="w-full border rounded-lg px-4 py-2"
          >
            <option value="XAF">XAF (Franc CFA)</option>
            <option value="EUR">EUR (Euro)</option>
            <option value="USD">USD (Dollar)</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block font-bold mb-2">Type d'acquisition *</label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input type="radio" name="acquisitionType" value="rent" required className="mr-2" />
            Location
          </label>
          <label className="flex items-center">
            <input type="radio" name="acquisitionType" value="sale" required className="mr-2" />
            Vente
          </label>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div>
          <label className="block font-bold mb-2">Pays *</label>
          <input
            type="text"
            name="country"
            required
            className="w-full border rounded-lg px-4 py-2"
            placeholder="Cameroun"
          />
        </div>

        <div>
          <label className="block font-bold mb-2">Ville *</label>
          <input
            type="text"
            name="city"
            required
            className="w-full border rounded-lg px-4 py-2"
            placeholder="Yaoundé"
          />
        </div>

        <div>
          <label className="block font-bold mb-2">Quartier *</label>
          <input
            type="text"
            name="area"
            required
            className="w-full border rounded-lg px-4 py-2"
            placeholder="Bastos"
          />
        </div>
      </div>

      <div>
        <label className="block font-bold mb-2">URL de l'image de couverture *</label>
        <input
          type="url"
          name="coverImageUrl"
          required
          className="w-full border rounded-lg px-4 py-2"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? 'Création en cours...' : 'Créer l\'annonce'}
      </button>
    </form>
  )
}