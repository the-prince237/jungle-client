import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { checkContentAccessAction, incrementViewCountAction } from '@/presentation/actions/content.actions'

export function useViewAccess(userId: string, contentId: string) {
  return useQuery({
    queryKey: ['viewAccess', userId, contentId],
    queryFn: () => checkContentAccessAction(userId, contentId),
    enabled: !!userId && !!contentId,
  })
}

export function useIncrementView() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: incrementViewCountAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['viewAccess'] })
    },
  })
}