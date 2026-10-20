import { createFileRoute } from '@tanstack/react-router'

import { SubscriptionPage } from '@/features/subscriptions/pages/subscription.page'

export const Route = createFileRoute('/_subscription/assinatura/retorno')({
  component: () => <SubscriptionPage entry="return" />,
})
