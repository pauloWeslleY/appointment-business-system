import type { ReactNode } from 'react'

import type { SubscriptionPageEntry } from './subscription-entry.type'

export interface SubscriptionOrganizationProviderProps {
  children: ReactNode
  pageEntry: SubscriptionPageEntry
}

export interface SubscriptionWorkspaceProviderProps {
  children: ReactNode
}
