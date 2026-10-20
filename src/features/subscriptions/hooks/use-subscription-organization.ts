import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { authClient } from '@/lib/auth'

import { subscriptionService } from '../services/subscription.service'

export function useSubscriptionOrganization() {
  const session = authClient.useSession()
  const userId = session.data?.user.id
  const organizationId = session.data?.session.activeOrganizationId ?? ''
  const queryClient = useQueryClient()
  const organizations = useQuery({
    queryKey: ['subscription', 'organizations', userId],
    queryFn: ({ signal }) => subscriptionService.organizations(signal),
    enabled: Boolean(userId),
  })
  const selection = useMutation({
    mutationFn: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ['subscription'] })
      const context = await subscriptionService.selectOrganization(id)
      queryClient.removeQueries({ queryKey: ['subscription'] })
      await session.refetch()

      return context
    },
  })
  const context = useQuery({
    queryKey: ['subscription', 'context', userId, organizationId],
    queryFn: ({ signal }) =>
      subscriptionService.context(organizationId, signal),
    enabled: Boolean(userId && organizationId) && !selection.isPending,
    retry: false,
  })

  return { session, userId, organizationId, organizations, selection, context }
}
