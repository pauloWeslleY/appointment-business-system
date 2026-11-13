import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useAppSession } from '@/features/authentication/hooks/use-app-session'
import { useMemberContext } from '@/features/members/hooks/use-member-context'
import { MemberRoles } from '@/features/members/types/member-role.type'
import { formatSubscriptionDate } from '@/features/subscriptions/policies/subscription-view'
import { subscriptionAccessQueryOptions } from '@/features/subscriptions/queries/subscription.query-options'
import { mapLabelBillingInterval } from '@/features/subscriptions/types/billing-interval.type'
import {
  mapLabelSubscriptionStatus,
  mapLabelSubscriptionStatusColor,
} from '@/features/subscriptions/types/subscription-status.type'

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

  const snapshot = subscriptionQuery.data
  const showInformationSummarySubscription =
    !subscriptionQuery.isPending && !subscriptionQuery.isError && snapshot

  const summaryItems = useMemo(() => {
    if (!snapshot) {
      return []
    }

    const { subscription, access } = snapshot
    const isTrial = access.status === 'trialing'
    const isRenewing =
      subscription &&
      !subscription.cancellationRequested &&
      access.status === 'active'

    let planLabel = 'Sem assinatura contratada'
    if (subscription) {
      planLabel = `Básico · ${mapLabelBillingInterval[subscription.billingInterval]}`
    } else if (isTrial) {
      planLabel = 'Teste gratuito'
    }

    let endDateLabel = 'Fim do período pago'
    if (isTrial) {
      endDateLabel = 'Fim do teste gratuito'
    } else if (isRenewing) {
      endDateLabel = 'Próxima renovação'
    } else if (access.canWrite) {
      endDateLabel = 'Acesso até'
    }

    let endDate = access.operationalUntil ?? subscription?.paidUntil ?? null
    if (isRenewing) {
      endDate = subscription.paidUntil
    }

    return [
      { label: 'Plano atual', value: planLabel },
      {
        label: 'Status da assinatura',
        value: mapLabelSubscriptionStatus[access.status],
        colorPalette: mapLabelSubscriptionStatusColor[access.status],
      },
      {
        label: 'Início da assinatura',
        value: formatSubscriptionDate(subscription?.createdAt ?? null),
      },
      { label: endDateLabel, value: formatSubscriptionDate(endDate) },
    ]
  }, [snapshot])

  return {
    snapshot,
    summaryItems,
    canShowSummary,
    subscriptionQuery,
    showInformationSummarySubscription,
  }
}
