import { createContext, useContext } from 'react'

import type { SubscriptionOrganizationContextValue } from '../types/subscription-workspace.type'

export const SubscriptionOrganizationContext =
  createContext<SubscriptionOrganizationContextValue | null>(null)

export function useSubscriptionOrganizationContext() {
  const organizationContextValue = useContext(SubscriptionOrganizationContext)

  if (!organizationContextValue) {
    throw new Error('Subscription organization provider is required')
  }

  return organizationContextValue
}

export function useActiveSubscriptionOrganization() {
  const { subscriptionContextQuery, pageEntry } =
    useSubscriptionOrganizationContext()
  const authenticatedSubscriptionContext = subscriptionContextQuery.data

  if (!authenticatedSubscriptionContext) {
    throw new Error('Subscription organization context is required')
  }

  return {
    authenticatedSubscriptionContext,
    pageEntry,
  }
}
