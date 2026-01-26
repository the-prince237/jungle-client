'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export function SearchFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [filters, setFilters] = useState({
    city: searchParams.get('city') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    type: searchParams.get('type') || '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const params = new URLSearchParams()
    if (filters.city) params.set('city', filters.city)
    if (filters.minPrice) params.set('minPrice', filters.minPrice)
    if (filters.maxPrice) params.set('maxPrice', filters.maxPrice)
    if (filters.type) params.set('type', filters.type)
    
    router.push(`/search?${params.toString()}`)
  }

  const handleReset = () => {
    setFilters({ city: '', minPrice: '', maxPrice: '', type: '' })
    router.push('/search')
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border text-gray-700 rounded-lg p-6 sticky top-4">
      <h3 className="font-bold text-lg mb-4">Filtres</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Ville</label>
          <input
            type="text"
            value={filters.city}
            onChange={e => setFilters(prev => ({ ...prev, city: e.target.value }))}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Ex: Yaoundé"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Prix minimum</label>
          <input
            type="number"
            value={filters.minPrice}
            onChange={e => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Prix maximum</label>
          <input
            type="number"
            value={filters.maxPrice}
            onChange={e => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="1000000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Type</label>
          <select
            value={filters.type}
            onChange={e => setFilters(prev => ({ ...prev, type: e.target.value }))}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">Tous</option>
            <option value="rent">Location</option>
            <option value="sale">Vente</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary"
        >
          Appliquer les filtres
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="w-full border py-2 rounded-lg hover:bg-gray-50"
        >
          Réinitialiser
        </button>
      </div>
    </form>
  )
}