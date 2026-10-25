import { Alert, Button, Heading, Spinner, Stack, Text } from '@chakra-ui/react'

import { SubscriptionBilling } from '../components/subscription-billing'
import { SubscriptionCancellation } from '../components/subscription-cancellation'
import { SubscriptionCheckoutStatus } from '../components/subscription-checkout-status'
import { SubscriptionNotices } from '../components/subscription-notices'
import { SubscriptionSection } from '../components/subscription-section'
import { SubscriptionSummary } from '../components/subscription-summary'
import { useSubscriptionWorkspaceContext } from '../hooks/use-subscription-workspace-context'

export function SubscriptionWorkspace() {
  const { subscriptionWorkspace } = useSubscriptionWorkspaceContext()
  const subscriptionAccessQuery = subscriptionWorkspace.subscriptionAccessQuery
  const subscriptionSnapshot = subscriptionAccessQuery.data

  if (subscriptionAccessQuery.isLoading) {
    return (
      <Alert.Root
        borderStartWidth="3px"
        borderStartColor="colorPalette.600"
        title="Consultando sua assinatura"
      >
        <Alert.Indicator>
          <Spinner size="sm" />
        </Alert.Indicator>
        <Alert.Title>Consultando sua assinatura…</Alert.Title>
      </Alert.Root>
    )
  }

  if (!subscriptionSnapshot) {
    return (
      <SubscriptionSection role="alert">
        <Heading size="md">Não foi possível consultar a assinatura</Heading>

        <Text my="3">
          {subscriptionAccessQuery.error?.message ??
            'Verifique sua conexão e tente novamente.'}
        </Text>

        <Button
          rounded="lg"
          onClick={subscriptionWorkspace.refreshSubscriptionAccess}
        >
          Atualizar consulta
        </Button>
      </SubscriptionSection>
    )
  }

  return (
    <Stack gap="6">
      <SubscriptionCheckoutStatus />
      <SubscriptionSummary />
      <SubscriptionBilling />
      <SubscriptionCancellation />

      {subscriptionWorkspace.shouldShowSubscriptionNotices && (
        <SubscriptionNotices />
      )}
    </Stack>
  )
}
