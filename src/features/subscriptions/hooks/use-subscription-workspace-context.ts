import { createContext, useContext } from 'react'

import type { SubscriptionWorkspaceContextValue } from '../types/subscription-workspace.type'

export const SubscriptionWorkspaceContext =
  createContext<SubscriptionWorkspaceContextValue | null>(null)

export function useSubscriptionWorkspaceContext() {
  const workspaceContextValue = useContext(SubscriptionWorkspaceContext)

  if (!workspaceContextValue) {
    throw new Error('Subscription workspace provider is required')
  }

  return workspaceContextValue
}

export function useSubscriptionDetails() {
  const { subscriptionWorkspace, authenticatedSubscriptionContext, pageEntry } =
    useSubscriptionWorkspaceContext()
  const subscriptionSnapshot =
    subscriptionWorkspace.subscriptionAccessQuery.data

  if (!subscriptionSnapshot) {
    throw new Error('Subscription snapshot is required')
  }

  return {
    subscriptionWorkspace,
    authenticatedSubscriptionContext,
    pageEntry,
    subscriptionSnapshot,
  }
}
