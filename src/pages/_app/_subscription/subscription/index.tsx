import { createFileRoute } from '@tanstack/react-router'

import { SubscriptionOrganizationProvider } from '@/features/subscriptions/components/subscription-organization-provider'
import { SubscriptionPageContent } from '@/features/subscriptions/pages/subscription.page'

export const Route = createFileRoute('/_app/_subscription/subscription/')({
  head: () => ({
    meta: [
      {
        title: 'Assinatura | Agendros',
      },
    ],
  }),
  component: () => (
    <SubscriptionOrganizationProvider pageEntry="default">
      <SubscriptionPageContent />
    </SubscriptionOrganizationProvider>
  ),
})
