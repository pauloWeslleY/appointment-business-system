import { AccessDeniedError } from '@/shared/errors'

import { useSubscriptionWorkspaceContext } from './use-subscription-workspace-context'

export function useSubscriptionNotices() {
  const { subscriptionWorkspace, authenticatedSubscriptionContext } =
    useSubscriptionWorkspaceContext()
  const {
    subscriptionNoticesQuery,
    markNoticeReadMutation,
    areSubscriptionNoticesUnavailable,
  } = subscriptionWorkspace
  const isNoticeAccessDenied =
    subscriptionNoticesQuery.error instanceof AccessDeniedError

  const refreshSubscriptionNotices = () => {
    void subscriptionNoticesQuery.refetch()
  }

  const handleMarkNoticeRead = (deliveryId: string) => {
    markNoticeReadMutation.mutate({
      organizationId: authenticatedSubscriptionContext.organization.id,
      deliveryId,
    })
  }

  return {
    subscriptionNoticesQuery,
    markNoticeReadMutation,
    areSubscriptionNoticesUnavailable,
    isNoticeAccessDenied,
    refreshSubscriptionNotices,
    handleMarkNoticeRead,
  }
}
