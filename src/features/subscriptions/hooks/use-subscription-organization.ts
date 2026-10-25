import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { memberQueryKey } from '@/features/members/queries/member.query-key'
import { organizationProfileQueryKeys } from '@/features/organization-profile/queries/organization-profile-query-key'
import { authClient } from '@/lib/auth'

import { subscriptionMutationOptions } from '../queries/subscription.mutation-options'
import { subscriptionQueryKey } from '../queries/subscription.query-key'
import {
  subscriptionContextQueryOptions,
  subscriptionOrganizationsQueryOptions,
} from '../queries/subscription.query-options'

export function useSubscriptionOrganization() {
  const authenticationSession = authClient.useSession()
  const userId = authenticationSession.data?.user.id
  const organizationId =
    authenticationSession.data?.session.activeOrganizationId ?? ''
  const queryClient = useQueryClient()
  const organizationsQuery = useQuery(
    subscriptionOrganizationsQueryOptions(userId),
  )
  const organizationSelectionOptions =
    subscriptionMutationOptions.selectOrganization()

  const organizationSelectionMutation = useMutation({
    ...organizationSelectionOptions,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: subscriptionQueryKey.all })
    },
    onSuccess: async () => {
      queryClient.removeQueries({ queryKey: subscriptionQueryKey.all })
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: memberQueryKey.all }),
        queryClient.invalidateQueries({ queryKey: memberQueryKey.meContext }),
        queryClient.invalidateQueries({
          queryKey: organizationProfileQueryKeys.all,
        }),
      ])
      await authenticationSession.refetch()
    },
  })

  const subscriptionContextQuery = useQuery({
    ...subscriptionContextQueryOptions(userId, organizationId),
    enabled:
      Boolean(userId && organizationId) &&
      !organizationSelectionMutation.isPending,
  })

  const organizationQueryError =
    organizationSelectionMutation.error ??
    organizationsQuery.error ??
    subscriptionContextQuery.error

  const canShowSubscriptionWorkspace = Boolean(
    userId &&
    !organizationSelectionMutation.isPending &&
    subscriptionContextQuery.data?.organization.id === organizationId,
  )

  const retryOrganizationQueries = () => {
    void organizationsQuery.refetch()
    if (organizationId) {
      void subscriptionContextQuery.refetch()
    }
  }

  const organizationSelectItems = (organizationsQuery.data ?? []).map(
    (organization) => ({
      value: organization.id,
      label: organization.name,
    }),
  )

  const handleOrganizationSelection = (selectedOrganizationId: string) => {
    organizationSelectionMutation.mutate(selectedOrganizationId)
  }

  return {
    authenticationSession,
    userId,
    organizationId,
    organizationsQuery,
    organizationSelectionMutation,
    subscriptionContextQuery,
    organizationQueryError,
    canShowSubscriptionWorkspace,
    retryOrganizationQueries,
    organizationSelectItems,
    handleOrganizationSelection,
  }
}
