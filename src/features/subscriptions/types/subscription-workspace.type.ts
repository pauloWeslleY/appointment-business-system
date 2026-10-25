import type { useSubscriptionOrganization } from '../hooks/use-subscription-organization'
import type { useSubscriptionWorkspace } from '../hooks/use-subscription-workspace'
import type { SubscriptionContext } from './subscription.model'
import type { SubscriptionPageEntry } from './subscription-entry.type'

export type SubscriptionWorkspaceState = ReturnType<
  typeof useSubscriptionWorkspace
>
export type SubscriptionOrganizationState = ReturnType<
  typeof useSubscriptionOrganization
>

export interface SubscriptionOrganizationContextValue extends SubscriptionOrganizationState {
  pageEntry: SubscriptionPageEntry
}

export interface SubscriptionWorkspaceContextValue {
  subscriptionWorkspace: SubscriptionWorkspaceState
  authenticatedSubscriptionContext: SubscriptionContext
  pageEntry: SubscriptionPageEntry
}
