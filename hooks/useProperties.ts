import { useQuery } from '@tanstack/react-query'
import { getPropertiesAction, getPropertyBySlugAction } from '@/presentation/actions/property.actions'
import type { PropertyFilters } from '@/domain/repositories/IPropertyRepository'

export function useProperties(filters?: PropertyFilters) {
  return useQuery({
    queryKey: ['properties', filters],
    queryFn: () => getPropertiesAction(filters),
  })
}

export function useProperty(slug: string) {
  return useQuery({
    queryKey: ['property', slug],
    queryFn: () => getPropertyBySlugAction(slug),
    enabled: !!slug,
  })
}
