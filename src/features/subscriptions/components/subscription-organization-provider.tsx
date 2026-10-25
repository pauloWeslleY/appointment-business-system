import { useSubscriptionOrganization } from '../hooks/use-subscription-organization'
import { SubscriptionOrganizationContext } from '../hooks/use-subscription-organization-context'
import type { SubscriptionOrganizationProviderProps } from '../types/subscription-page.type'

export function SubscriptionOrganizationProvider({
  children,
  pageEntry,
}: SubscriptionOrganizationProviderProps) {
  const subscriptionOrganizationState = useSubscriptionOrganization()

  return (
    <SubscriptionOrganizationContext.Provider
      value={{ ...subscriptionOrganizationState, pageEntry }}
    >
      {children}
    </SubscriptionOrganizationContext.Provider>
  )
}
