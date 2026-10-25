import { mutationOptions } from '@tanstack/react-query'

import {
  cancelSubscriptionService,
  createSubscriptionCheckoutService,
  createSubscriptionPortalService,
  markSubscriptionNoticeReadService,
  selectSubscriptionOrganizationService,
  startSubscriptionTrialService,
  updateSubscriptionBillingIntervalService,
} from '../services/subscription.service'
import type { BillingIntervalType } from '../types/billing-interval.type'
import type { SubscriptionCommandResult } from '../types/subscription-api.type'
import type { SubscriptionAction } from '../types/subscription-command.type'

interface SubscriptionCommandParameters {
  organizationId: string
  requestId: string
}

interface SubscriptionBillingParameters extends SubscriptionCommandParameters {
  interval: BillingIntervalType
}

export const subscriptionMutationOptions = {
  command(
    execute: (action: SubscriptionAction) => Promise<SubscriptionCommandResult>,
    userId: string,
    organizationId: string,
  ) {
    return mutationOptions({
      mutationKey: ['subscription-command', userId, organizationId],
      mutationFn: execute,
    })
  },

  selectOrganization() {
    return mutationOptions({
      mutationKey: ['select-subscription-organization'],
      mutationFn: (organizationId: string) =>
        selectSubscriptionOrganizationService(organizationId),
    })
  },

  trial() {
    return mutationOptions({
      mutationKey: ['start-subscription-trial'],
      mutationFn: (organizationId: string) =>
        startSubscriptionTrialService(organizationId),
    })
  },

  checkout() {
    return mutationOptions({
      mutationKey: ['create-subscription-checkout'],
      mutationFn: ({
        organizationId,
        interval,
        requestId,
      }: SubscriptionBillingParameters) =>
        createSubscriptionCheckoutService(organizationId, interval, requestId),
    })
  },

  cancel() {
    return mutationOptions({
      mutationKey: ['cancel-subscription'],
      mutationFn: ({
        organizationId,
        requestId,
      }: SubscriptionCommandParameters) =>
        cancelSubscriptionService(organizationId, requestId),
    })
  },

  changeInterval() {
    return mutationOptions({
      mutationKey: ['change-subscription-interval'],
      mutationFn: ({
        organizationId,
        interval,
        requestId,
      }: SubscriptionBillingParameters) =>
        updateSubscriptionBillingIntervalService(
          organizationId,
          interval,
          requestId,
        ),
    })
  },

  portal() {
    return mutationOptions({
      mutationKey: ['open-subscription-portal'],
      mutationFn: ({
        organizationId,
        requestId,
      }: SubscriptionCommandParameters) =>
        createSubscriptionPortalService(organizationId, requestId),
    })
  },

  readNotice() {
    return mutationOptions({
      mutationKey: ['read-subscription-notice'],
      mutationFn: ({
        organizationId,
        deliveryId,
      }: {
        organizationId: string
        deliveryId: string
      }) => markSubscriptionNoticeReadService(organizationId, deliveryId),
    })
  },
}
