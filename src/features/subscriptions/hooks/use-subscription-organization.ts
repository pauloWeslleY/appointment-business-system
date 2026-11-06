import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { useMemo } from 'react'

import { useAppSession } from '@/features/authentication/hooks/use-app-session'
import { useMemberContext } from '@/features/members/hooks/use-member-context'
import { memberQueryKey } from '@/features/members/queries/member.query-key'

import { subscriptionMutationOptions } from '../queries/subscription.mutation-options'
import { subscriptionOrganizationsQueryOptions } from '../queries/subscription.query-options'
import { toSubscriptionContext } from '../services/subscription.service'

export function useSubscriptionOrganization() {
  const authenticationSession = useAppSession()
  const queryClient = useQueryClient()
  const router = useRouter()
  const memberContext = useMemberContext()
  const subscriptionContext = useMemo(
    () => (memberContext ? toSubscriptionContext(memberContext) : undefined),
    [memberContext],
  )
  const userId = authenticationSession.data?.user.id
  const organizationId =
    authenticationSession.data?.session.activeOrganizationId ?? ''
  const organizationsQuery = useQuery(
    subscriptionOrganizationsQueryOptions(userId),
  )

  const organizationSelectionOptions =
    subscriptionMutationOptions.selectOrganization()

  const organizationSelectionMutation = useMutation({
    ...organizationSelectionOptions,
    onSuccess: async (data, variables, result, context) => {
      await organizationSelectionOptions.onSuccess?.(
        data,
        variables,
        result,
        context,
      )
      await router.invalidate()
    },
  })

  const organizationQueryError =
    organizationSelectionMutation.error ?? organizationsQuery.error

  const canShowSubscriptionWorkspace = Boolean(
    userId &&
    !organizationSelectionMutation.isPending &&
    subscriptionContext?.organization.id === organizationId,
  )

  const retryOrganizationQueries = async (): Promise<void> => {
    await organizationsQuery.refetch()
    if (organizationId) {
      await queryClient.invalidateQueries({
        queryKey: memberQueryKey.context(),
      })
      await router.invalidate()
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
    subscriptionContext,
    organizationQueryError,
    canShowSubscriptionWorkspace,
    retryOrganizationQueries,
    organizationSelectItems,
    handleOrganizationSelection,
  }
}
