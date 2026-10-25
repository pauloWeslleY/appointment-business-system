import { useActiveSubscriptionOrganization } from '../hooks/use-subscription-organization-context'
import { useSubscriptionWorkspace } from '../hooks/use-subscription-workspace'
import { SubscriptionWorkspaceContext } from '../hooks/use-subscription-workspace-context'
import type { SubscriptionWorkspaceProviderProps } from '../types/subscription-page.type'

export function SubscriptionWorkspaceProvider({
  children,
}: SubscriptionWorkspaceProviderProps) {
  const { authenticatedSubscriptionContext, pageEntry } =
    useActiveSubscriptionOrganization()
  const subscriptionWorkspace = useSubscriptionWorkspace(
    authenticatedSubscriptionContext,
    pageEntry === 'return',
  )

  return (
    <SubscriptionWorkspaceContext.Provider
      value={{
        subscriptionWorkspace,
        authenticatedSubscriptionContext,
        pageEntry,
      }}
    >
      {children}
    </SubscriptionWorkspaceContext.Provider>
  )
}
