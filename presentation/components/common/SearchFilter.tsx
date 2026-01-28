'use client'

import { cn } from '@/lib/utils'
import { Filter, FilterX } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export function SearchFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [open, setOpen] = useState(false)
  
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
    
    setOpen(false)
    router.push(`/feed?${params.toString()}`)
  }

  const handleReset = () => {
    setFilters({ city: '', minPrice: '', maxPrice: '', type: '' })
    setOpen(false)
    router.push('/feed')
  }

  return (
    <>
      <div className={cn('hidden sm:block lg:hidden opacity-100 fixed rounded-0 right-0 top-0 z-50 backdrop-blur-lg w-screen h-screen bg-foreground/50', {"-right-[100vw] opacity-0": !open})} />
      <div onClick={() => setOpen((o) => !o)} className={cn('lg:hidden z-60 fixed left-[calc(100vw-72px)] top-25 bg-destructive transition-colors text-white size-14 rounded-full flex items-center justify-center shadow-lg cursor-pointer', {"left-4 bg-primary": !open})}>
        <FilterX className={cn('opacity-0 absolute', {"opacity-100": open})} size={24} />
        <Filter className={cn('opacity-100 absolute', {"opacity-0": open})} size={24} />
      </div>
      <aside className={cn("w-full sm:w-80 left-0 xl:w-100 bg-gray-50 p-4 fixed z-50 h-screen border-r opacity-100", {"-left-[100vw] opacity-0 lg:left-0 lg:opacity-100": !open})}>
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
      </aside>
    </>
  )
}