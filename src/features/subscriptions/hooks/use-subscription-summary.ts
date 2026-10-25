import {
  canManageSubscription,
  formatSubscriptionDate,
} from '../policies/subscription-view'
import { useSubscriptionDetails } from './use-subscription-workspace-context'

export function useSubscriptionSummary() {
  const {
    subscriptionWorkspace,
    subscriptionSnapshot,
    authenticatedSubscriptionContext,
  } = useSubscriptionDetails()
  const {
    subscriptionCommandMutation,
    subscriptionAccessQuery,
    refreshSubscriptionAccess,
  } = subscriptionWorkspace
  const subscription = subscriptionSnapshot.subscription
  const canCreateSubscription = canManageSubscription(
    authenticatedSubscriptionContext,
    subscriptionSnapshot,
    'create',
  )
  const canReadSubscription = canManageSubscription(
    authenticatedSubscriptionContext,
    subscriptionSnapshot,
    'read',
  )
  const isContractorOrUnassigned =
    !subscription ||
    subscription.contractorUserId === authenticatedSubscriptionContext.user.id
  const currentPlanLabel = subscription
    ? subscription.billingInterval === 'annual'
      ? 'Anual · R$ 350,00'
      : 'Mensal · R$ 35,00'
    : 'Sem contratação paga'

  const paidPeriodLabel = subscription?.paidStartsAt
    ? `${formatSubscriptionDate(subscription.paidStartsAt)} até ${formatSubscriptionDate(subscription.paidUntil)}`
    : 'Nenhum período pago'

  const canStartTrial =
    canCreateSubscription && !subscriptionSnapshot.trial?.used && !subscription
  const isSubscriptionActionPending = subscriptionCommandMutation.isPending

  const nextBillingIntervalLabel = subscription?.nextBillingInterval
    ? subscription.nextBillingInterval === 'annual'
      ? 'anual · R$ 350,00'
      : 'mensal · R$ 35,00'
    : null

  const nextBillingIntervalDateLabel = formatSubscriptionDate(
    subscription?.nextBillingIntervalEffectiveAt ?? null,
  )

  const handleStartTrial = () => {
    subscriptionCommandMutation.mutate({ type: 'trial' })
  }

  const handleOpenBillingPortal = () => {
    subscriptionCommandMutation.mutate({ type: 'portal' })
  }

  return {
    subscriptionSnapshot,
    refreshSubscriptionAccess,
    subscriptionCommandMutation,
    subscriptionAccessQuery,
    subscription,
    canCreateSubscription,
    canReadSubscription,
    isContractorOrUnassigned,
    currentPlanLabel,
    paidPeriodLabel,
    canStartTrial,
    isSubscriptionActionPending,
    nextBillingIntervalDateLabel,
    nextBillingIntervalLabel,
    handleStartTrial,
    handleOpenBillingPortal,
  }
}
