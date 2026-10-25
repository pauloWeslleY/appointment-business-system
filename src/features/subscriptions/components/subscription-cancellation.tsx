import { Button, Heading, HStack, Text } from '@chakra-ui/react'

import { useSubscriptionCancellation } from '../hooks/use-subscription-cancellation'
import { SubscriptionSection } from './subscription-section'

export function SubscriptionCancellation() {
  const {
    subscriptionCommandMutation,
    subscription,
    isCancellationConfirmationOpen,
    canCancelSubscription,
    hasPaidAccess,
    handleRequestCancellation,
    handleDismissCancellation,
    handleConfirmCancellation,
  } = useSubscriptionCancellation()

  const showCancellationSection =
    canCancelSubscription &&
    hasPaidAccess &&
    !subscription?.cancellationRequested

  return (
    <>
      {showCancellationSection && (
        <SubscriptionSection>
          <Heading size="md">Cancelar a próxima renovação</Heading>
          <Text mt="2" mb="4">
            Sem multa. O acesso continua até o fim do período pago. O
            cancelamento não gera reembolso proporcional automático.
          </Text>

          {!isCancellationConfirmationOpen ? (
            <Button
              variant="outline"
              rounded="lg"
              colorPalette="red"
              onClick={handleRequestCancellation}
            >
              Solicitar cancelamento
            </Button>
          ) : (
            <HStack flexWrap="wrap">
              <Button
                colorPalette="red"
                disabled={subscriptionCommandMutation.isPending}
                onClick={handleConfirmCancellation}
              >
                Confirmar cancelamento da renovação
              </Button>
              <Button variant="ghost" onClick={handleDismissCancellation}>
                Voltar
              </Button>
            </HStack>
          )}
        </SubscriptionSection>
      )}
    </>
  )
}
