'use client'

import { User } from '@/domain/entities/User'
import { useState } from 'react'

interface ProfileEditFormProps {
  user: User
}

export function ProfileEditForm({ user }: ProfileEditFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // TODO: Implémenter la mise à jour
    alert('Fonctionnalité en développement')
    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block font-bold mb-2">Username</label>
        <input
          type="text"
          defaultValue={user.username}
          className="w-full border rounded-lg px-4 py-2 bg-gray-50"
          disabled
        />
        <p className="text-sm text-gray-600 mt-1">
          Le username ne peut pas être modifié
        </p>
      </div>

      <div>
        <label className="block font-bold mb-2">Email</label>
        <input
          type="email"
          defaultValue={user.email}
          className="w-full border rounded-lg px-4 py-2"
        />
      </div>

      <div>
        <label className="block font-bold mb-2">Rôle</label>
        <input
          type="text"
          value={user.role === 'agent' ? 'Agent' : user.role === 'admin' ? 'Admin' : 'Acheteur'}
          className="w-full border rounded-lg px-4 py-2 bg-gray-50"
          disabled
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary disabled:opacity-50"
      >
        {isSubmitting ? 'Sauvegarde...' : 'Sauvegarder les modifications'}
      </button>
    </form>
  )
}