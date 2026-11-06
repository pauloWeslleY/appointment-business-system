import { createFileRoute } from '@tanstack/react-router'

import { SubscriptionOrganizationProvider } from '@/features/subscriptions/components/subscription-organization-provider'
import { SubscriptionPageContent } from '@/features/subscriptions/pages/subscription.page'

export const Route = createFileRoute(
  '/_app/_subscription/subscription/canceled',
)({
  head: () => ({
    meta: [{ title: 'Pagamento cancelado' }],
  }),
  component: () => (
    <SubscriptionOrganizationProvider pageEntry="cancel">
      <SubscriptionPageContent />
    </SubscriptionOrganizationProvider>
  ),
})
