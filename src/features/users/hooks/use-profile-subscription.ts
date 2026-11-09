import { useQuery } from '@tanstack/react-query'

import { useAppSession } from '@/features/authentication/hooks/use-app-session'
import { useMemberContext } from '@/features/members/hooks/use-member-context'
import { MemberRoles } from '@/features/members/types/member-role.type'
import { subscriptionAccessQueryOptions } from '@/features/subscriptions/queries/subscription.query-options'

export function useProfileSubscription() {
  const { data: session } = useAppSession()
  const memberContext = useMemberContext()
  const organizationId = session?.session.activeOrganizationId ?? ''
  const canShowSummary =
    memberContext?.role === MemberRoles.OWNER &&
    memberContext.user.id === session?.user.id &&
    memberContext.organization.id === organizationId

  const subscriptionQuery = useQuery({
    ...subscriptionAccessQueryOptions(session?.user.id ?? '', organizationId),
    enabled: canShowSummary && organizationId !== '',
  })

  return {
    canShowSummary,
    subscriptionQuery,
  }
}
