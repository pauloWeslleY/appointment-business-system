import {
  Badge,
  Box,
  Button,
  Heading,
  HStack,
  SimpleGrid,
  Text,
} from '@chakra-ui/react'

import { useSubscriptionSummary } from '../hooks/use-subscription-summary'
import {
  formatSubscriptionDate,
  subscriptionStatusLabel,
} from '../policies/subscription-view'
import { SubscriptionSection } from './subscription-section'

export function SubscriptionSummary() {
  const {
    subscriptionSnapshot,
    refreshSubscriptionAccess,
    subscriptionCommandMutation,
    subscriptionAccessQuery,
    subscription,
    canReadSubscription,
    isContractorOrUnassigned,
    currentPlanLabel,
    paidPeriodLabel,
    canStartTrial,
    isSubscriptionActionPending,
    nextBillingIntervalDateLabel,
    nextBillingIntervalLabel,
    handleStartTrial,
    handleOpenBillingPortal,
  } = useSubscriptionSummary()

  return (
    <SubscriptionSection>
      <HStack justify="space-between" gap="4" flexWrap="wrap">
        <Box>
          <Text color="fg.muted" fontSize="sm">
            PLANO BÁSICO
          </Text>
          <Heading size="2xl" mt="1">
            {subscriptionStatusLabel[subscriptionSnapshot.access.status]}
          </Heading>
        </Box>

        <Badge
          rounded="lg"
          size="lg"
          colorPalette={
            subscriptionSnapshot.access.canWrite ? 'green' : 'orange'
          }
        >
          {subscriptionSnapshot.access.canWrite
            ? 'Operação liberada'
            : 'Somente leitura'}
        </Badge>
      </HStack>

      <Text color="fg.muted" mt="3">
        Até 3 estabelecimentos e 10 profissionais ativos. Serviços, clientes e
        agendamentos ilimitados.
      </Text>

      <SimpleGrid columns={{ base: 1, md: 3 }} gap="5" my="7">
        <div>
          <Text color="fg.muted" fontSize="sm">
            Modalidade atual
          </Text>
          <Text fontWeight="semibold">{currentPlanLabel}</Text>
        </div>

        <div>
          <Text color="fg.muted" fontSize="sm">
            Período pago
          </Text>
          <Text>{paidPeriodLabel}</Text>
        </div>

        <div>
          <Text color="fg.muted" fontSize="sm">
            Operação liberada até
          </Text>
          <Text>
            {formatSubscriptionDate(
              subscriptionSnapshot.access.operationalUntil,
            )}
          </Text>
        </div>
      </SimpleGrid>
      <Text fontSize="xs" color="fg.muted">
        Datas exibidas no horário de São Paulo.
      </Text>

      {subscriptionSnapshot.access.status === 'trialing' && (
        <Text mt="4">
          Teste gratuito por 7 dias, sem cartão. Não há cobrança automática sem
          contratação.
        </Text>
      )}

      {subscriptionSnapshot.access.status === 'grace' && (
        <Box mt="4" role="status" bg="orange.subtle" rounded="xl" p="4">
          <Text>
            Regularize até{' '}
            {formatSubscriptionDate(subscription?.graceEndsAt ?? null)}. A
            tolerância começou em{' '}
            {formatSubscriptionDate(subscription?.graceStartsAt ?? null)} e não
            reinicia a cada tentativa. Durante esse prazo você pode operar e
            criar agendamentos.
          </Text>
        </Box>
      )}

      {!subscriptionSnapshot.access.canWrite && (
        <Text mt="4">
          Seus dados e agendamentos existentes estão preservados. Novas escritas
          e agendamentos permanecem bloqueados até a regularização ou
          contratação confirmada.
        </Text>
      )}

      {subscription?.cancellationRequested && (
        <Text mt="4">
          Não haverá renovação. O acesso pago permanece até{' '}
          {formatSubscriptionDate(subscription.paidUntil)}.
        </Text>
      )}

      {nextBillingIntervalLabel && (
        <Text mt="4">
          Troca programada para {nextBillingIntervalLabel}
          em {nextBillingIntervalDateLabel}. Sem proporcional imediato.
        </Text>
      )}

      {!isContractorOrUnassigned && (
        <Text mt="4">
          Você pode consultar o acesso. A gestão financeira e os avisos são
          exclusivos do contratante.
        </Text>
      )}

      {subscriptionCommandMutation.error && (
        <Text role="alert" color="red.fg" mt="4">
          {subscriptionCommandMutation.error.message} Se a conexão falhou,
          repita a mesma ação: a chave da operação será preservada.
        </Text>
      )}

      {subscriptionCommandMutation.data && (
        <Text role="status" mt="4" color="colorPalette.fg">
          {subscriptionCommandMutation.data.message}
        </Text>
      )}

      <HStack mt="6" flexWrap="wrap" gap="3">
        {canStartTrial && (
          <Button
            rounded="lg"
            loading={isSubscriptionActionPending}
            onClick={handleStartTrial}
          >
            Iniciar teste gratuito
          </Button>
        )}

        {subscription && canReadSubscription && (
          <Button
            rounded="lg"
            variant="outline"
            loading={isSubscriptionActionPending}
            onClick={handleOpenBillingPortal}
          >
            Cartão, faturas e regularização
          </Button>
        )}

        <Button
          rounded="lg"
          variant="ghost"
          loading={subscriptionAccessQuery.isFetching}
          onClick={refreshSubscriptionAccess}
        >
          Atualizar estado
        </Button>
      </HStack>
    </SubscriptionSection>
  )
}
