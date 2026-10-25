import { Box, Button, Heading, HStack, Text } from '@chakra-ui/react'

import { useSubscriptionBilling } from '../hooks/use-subscription-billing'
import { SubscriptionSection } from './subscription-section'
import { SubscriptionSelect } from './subscription-select'

export function SubscriptionBilling() {
  const {
    selectedBillingInterval,
    handleSelectBillingInterval,
    canStartCheckout,
    canScheduleBillingInterval,
    isBillingActionDisabled,
    handleSubmitBillingChange,
  } = useSubscriptionBilling()

  return (
    <>
      {(canStartCheckout || canScheduleBillingInterval) && (
        <SubscriptionSection>
          <Heading size="lg">
            {canStartCheckout
              ? 'Escolha sua modalidade'
              : 'Programar modalidade para o próximo ciclo'}
          </Heading>

          <Text color="fg.muted" mt="2" mb="5">
            {canStartCheckout
              ? 'Cobrança recorrente após contratação. O pagamento é feito na página segura da Stripe.'
              : 'A modalidade atual permanece até a próxima renovação, sem cobrança proporcional agora.'}
          </Text>

          <HStack gap="4" align="end" flexWrap="wrap">
            <Box minW="280px">
              <SubscriptionSelect
                id="billing-interval"
                label="Modalidade"
                value={selectedBillingInterval}
                items={[
                  {
                    value: 'monthly',
                    label: 'Mensal · R$ 35,00/mês',
                  },
                  {
                    value: 'annual',
                    label: 'Anual · R$ 350,00/ano antecipado',
                  },
                ]}
                onChange={handleSelectBillingInterval}
              />
            </Box>

            <Button
              rounded="lg"
              disabled={isBillingActionDisabled}
              onClick={handleSubmitBillingChange}
            >
              {canStartCheckout
                ? 'Continuar para pagamento'
                : 'Programar troca'}
            </Button>
          </HStack>
        </SubscriptionSection>
      )}
    </>
  )
}
