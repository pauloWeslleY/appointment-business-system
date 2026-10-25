import { useState } from 'react'

import { canManageSubscription } from '../policies/subscription-view'
import {
  SubscriptionStatuses,
  type SubscriptionStatusType,
} from '../types/subscription-status.type'
import { useSubscriptionDetails } from './use-subscription-workspace-context'

const STATUS_PAID_ACCESS = new Set<SubscriptionStatusType>([
  SubscriptionStatuses.ACTIVE,
  SubscriptionStatuses.CANCELLATION_SCHEDULED,
])

export function useSubscriptionCancellation() {
  const {
    subscriptionWorkspace,
    subscriptionSnapshot,
    authenticatedSubscriptionContext,
  } = useSubscriptionDetails()
  const [isCancellationConfirmationOpen, setIsCancellationConfirmationOpen] =
    useState(false)
  const subscription = subscriptionSnapshot.subscription
  const canCancelSubscription = canManageSubscription(
    authenticatedSubscriptionContext,
    subscriptionSnapshot,
    'cancel',
  )

  const hasPaidAccess = STATUS_PAID_ACCESS.has(
    subscriptionSnapshot.access.status,
  )
  const subscriptionCommandMutation =
    subscriptionWorkspace.subscriptionCommandMutation

  const handleRequestCancellation = () => {
    setIsCancellationConfirmationOpen(true)
  }

  const handleDismissCancellation = () => {
    setIsCancellationConfirmationOpen(false)
  }

  const handleConfirmCancellation = () => {
    subscriptionCommandMutation.mutate({ type: 'cancel' })
  }

  return {
    subscriptionCommandMutation,
    subscription,
    isCancellationConfirmationOpen,
    canCancelSubscription,
    hasPaidAccess,
    handleRequestCancellation,
    handleDismissCancellation,
    handleConfirmCancellation,
  }
}
