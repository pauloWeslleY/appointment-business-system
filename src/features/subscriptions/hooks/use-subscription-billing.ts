import { useState } from 'react'

import { canManageSubscription } from '../policies/subscription-view'
import type { BillingIntervalType } from '../types/billing-interval.type'
import {
  BillingIntervals,
  BillingIntervalSchema,
} from '../types/billing-interval.type'
import {
  SubscriptionStatuses,
  type SubscriptionStatusType,
} from '../types/subscription-status.type'
import { useSubscriptionDetails } from './use-subscription-workspace-context'

export function useSubscriptionBilling() {
  const {
    subscriptionWorkspace,
    subscriptionSnapshot,
    authenticatedSubscriptionContext,
  } = useSubscriptionDetails()
  const [selectedBillingInterval, setSelectedBillingInterval] =
    useState<BillingIntervalType>(BillingIntervals.MONTHLY)
  const canCreateSubscription = canManageSubscription(
    authenticatedSubscriptionContext,
    subscriptionSnapshot,
    'create',
  )
  const canUpdateSubscription = canManageSubscription(
    authenticatedSubscriptionContext,
    subscriptionSnapshot,
    'update',
  )
  const subscriptionCommandMutation =
    subscriptionWorkspace.subscriptionCommandMutation
  const subscription = subscriptionSnapshot.subscription

  const checkoutEligibleStatuses = new Set<SubscriptionStatusType>([
    SubscriptionStatuses.PAYMENT_REQUIRED,
    SubscriptionStatuses.TRIALING,
    SubscriptionStatuses.TRIAL_EXPIRED,
    SubscriptionStatuses.CANCELLED,
  ])

  const isCheckoutEligibleStatus = checkoutEligibleStatuses.has(
    subscriptionSnapshot.access.status,
  )
  const canStartCheckout = canCreateSubscription && isCheckoutEligibleStatus
  const canScheduleBillingInterval =
    canUpdateSubscription &&
    subscriptionSnapshot.access.status === SubscriptionStatuses.ACTIVE &&
    !subscription?.cancellationRequested

  const isBillingActionDisabled =
    subscriptionCommandMutation.isPending ||
    (!canStartCheckout &&
      selectedBillingInterval === subscription?.billingInterval &&
      !subscription.nextBillingInterval)

  const handleSubmitBillingChange = () => {
    subscriptionCommandMutation.mutate({
      type: canStartCheckout ? 'checkout' : 'interval',
      interval: selectedBillingInterval,
    })
  }

  const handleSelectBillingInterval = (selectedIntervalValue: string) => {
    setSelectedBillingInterval(
      BillingIntervalSchema.parse(selectedIntervalValue),
    )
  }

  return {
    selectedBillingInterval,
    handleSelectBillingInterval,
    canStartCheckout,
    canScheduleBillingInterval,
    isBillingActionDisabled,
    handleSubmitBillingChange,
  }
}
