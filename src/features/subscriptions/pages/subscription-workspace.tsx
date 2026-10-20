import {
  Badge,
  Box,
  Button,
  Heading,
  HStack,
  NativeSelect,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useState } from 'react'

import { SubscriptionNotices } from '../components/subscription-notices'
import { useSubscriptionWorkspace } from '../hooks/use-subscription-workspace'
import {
  canManageSubscription,
  formatSubscriptionDate,
  subscriptionStatusLabel,
} from '../policies/subscription-view'
import {
  type BillingInterval,
  billingIntervalSchema,
  type SubscriptionContext,
} from '../schemas/subscription.schema'

export function SubscriptionWorkspace({
  context,
  entry,
}: {
  context: SubscriptionContext
  entry: 'default' | 'return' | 'cancel'
}) {
  const workspace = useSubscriptionWorkspace(context, entry === 'return')
  const { access, command } = workspace
  const [interval, setInterval] = useState<BillingInterval>('monthly')
  const [confirmCancel, setConfirmCancel] = useState(false)
  const snapshot = access.data

  if (access.isLoading) {
    return <Text role="status">Consultando sua assinatura…</Text>
  }

  if (!snapshot) {
    return (
      <Box role="alert" borderWidth="1px" rounded="xl" p="6">
        <Heading size="md">Não foi possível consultar a assinatura</Heading>
        <Text my="3">
          {access.error?.message ?? 'Verifique sua conexão e tente novamente.'}
        </Text>
        <Button onClick={() => access.refetch()}>Atualizar consulta</Button>
      </Box>
    )
  }

  const paid = snapshot.subscription
  const create = canManageSubscription(context, snapshot, 'create')
  const update = canManageSubscription(context, snapshot, 'update')
  const cancel = canManageSubscription(context, snapshot, 'cancel')
  const read = canManageSubscription(context, snapshot, 'read')
  const paidActive =
    snapshot.access.status === 'active' ||
    snapshot.access.status === 'cancellation_scheduled'
  const checkoutAllowed =
    create &&
    ['payment_required', 'trialing', 'trial_expired', 'cancelled'].includes(
      snapshot.access.status,
    )
  const contractor = !paid || paid.contractorUserId === context.user.id

  return (
    <Stack gap="6">
      {(entry !== 'default' || workspace.pendingCheckout) && (
        <Box
          role="status"
          bg={workspace.confirmed ? 'green.subtle' : 'blue.subtle'}
          rounded="xl"
          p="5"
        >
          <Heading size="md">
            {workspace.confirmed
              ? 'Novo período confirmado pelo sistema'
              : entry === 'cancel'
                ? 'Checkout interrompido'
                : 'Aguardando confirmação do pagamento'}
          </Heading>
          <Text mt="2">
            {workspace.confirmed
              ? 'O backend confirmou o período pago mostrado abaixo.'
              : 'O retorno do Checkout não confirma uma cobrança. O estado abaixo vem da consulta da assinatura; atualize enquanto a confirmação é processada.'}
          </Text>
          <Button
            mt="3"
            variant="outline"
            size="sm"
            loading={access.isFetching}
            onClick={() => access.refetch()}
          >
            Consultar novamente
          </Button>
        </Box>
      )}
      <Box
        borderWidth="1px"
        rounded="2xl"
        p={{ base: '5', md: '7' }}
        bg="bg.panel"
      >
        <HStack justify="space-between" gap="4" flexWrap="wrap">
          <Box>
            <Text color="fg.muted" fontSize="sm">
              PLANO BÁSICO
            </Text>
            <Heading size="2xl" mt="1">
              {subscriptionStatusLabel[snapshot.access.status]}
            </Heading>
          </Box>
          <Badge
            size="lg"
            colorPalette={snapshot.access.canWrite ? 'teal' : 'orange'}
          >
            {snapshot.access.canWrite ? 'Operação liberada' : 'Somente leitura'}
          </Badge>
        </HStack>
        <Text color="fg.muted" mt="3">
          Até 3 estabelecimentos e 10 profissionais ativos. Serviços, clientes e
          agendamentos ilimitados.
        </Text>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap="5" my="7">
          <Box>
            <Text color="fg.muted" fontSize="sm">
              Modalidade atual
            </Text>
            <Text fontWeight="semibold">
              {paid
                ? paid.billingInterval === 'annual'
                  ? 'Anual · R$ 350,00'
                  : 'Mensal · R$ 35,00'
                : 'Sem contratação paga'}
            </Text>
          </Box>
          <Box>
            <Text color="fg.muted" fontSize="sm">
              Período pago
            </Text>
            <Text>
              {paid?.paidStartsAt
                ? `${formatSubscriptionDate(paid.paidStartsAt)} até ${formatSubscriptionDate(paid.paidUntil)}`
                : 'Nenhum período pago'}
            </Text>
          </Box>
          <Box>
            <Text color="fg.muted" fontSize="sm">
              Operação liberada até
            </Text>
            <Text>
              {formatSubscriptionDate(snapshot.access.operationalUntil)}
            </Text>
          </Box>
        </SimpleGrid>
        <Text fontSize="xs" color="fg.muted">
          Datas exibidas no horário de São Paulo.
        </Text>
        {snapshot.access.status === 'trialing' && (
          <Text mt="4">
            Teste gratuito por 7 dias, sem cartão. Não há cobrança automática
            sem contratação.
          </Text>
        )}
        {snapshot.access.status === 'grace' && (
          <Box mt="4" role="status" bg="orange.subtle" rounded="xl" p="4">
            <Text>
              Regularize até {formatSubscriptionDate(paid?.graceEndsAt ?? null)}
              . A tolerância começou em{' '}
              {formatSubscriptionDate(paid?.graceStartsAt ?? null)} e não
              reinicia a cada tentativa. Durante esse prazo você pode operar e
              criar agendamentos.
            </Text>
          </Box>
        )}
        {!snapshot.access.canWrite && (
          <Text mt="4">
            Seus dados e agendamentos existentes estão preservados. Novas
            escritas e agendamentos permanecem bloqueados até a regularização ou
            contratação confirmada.
          </Text>
        )}
        {paid?.cancellationRequested && (
          <Text mt="4">
            Não haverá renovação. O acesso pago permanece até{' '}
            {formatSubscriptionDate(paid.paidUntil)}.
          </Text>
        )}
        {paid?.nextBillingInterval && (
          <Text mt="4">
            Troca programada para{' '}
            {paid.nextBillingInterval === 'annual'
              ? 'anual · R$ 350,00'
              : 'mensal · R$ 35,00'}{' '}
            em {formatSubscriptionDate(paid.nextBillingIntervalEffectiveAt)}.
            Sem proporcional imediato.
          </Text>
        )}
        {!contractor && (
          <Text mt="4">
            Você pode consultar o acesso. A gestão financeira e os avisos são
            exclusivos do contratante.
          </Text>
        )}
        {command.error && (
          <Text role="alert" color="red.600" mt="4">
            {command.error.message} Se a conexão falhou, repita a mesma ação: a
            chave da operação será preservada.
          </Text>
        )}
        {command.data && (
          <Text role="status" mt="4" color="teal.600">
            {command.data.message}
          </Text>
        )}
        <HStack mt="6" flexWrap="wrap" gap="3">
          {create && !snapshot.trial?.used && !paid && (
            <Button
              disabled={command.isPending}
              onClick={() => command.mutate({ type: 'trial' })}
            >
              Iniciar teste gratuito
            </Button>
          )}
          {paid && read && (
            <Button
              variant="outline"
              disabled={command.isPending}
              onClick={() => command.mutate({ type: 'portal' })}
            >
              Cartão, faturas e regularização
            </Button>
          )}
          <Button
            variant="ghost"
            loading={access.isFetching}
            onClick={() => access.refetch()}
          >
            Atualizar estado
          </Button>
        </HStack>
      </Box>
      {(checkoutAllowed ||
        (update &&
          snapshot.access.status === 'active' &&
          !paid?.cancellationRequested)) && (
        <Box
          borderWidth="1px"
          rounded="2xl"
          p={{ base: '5', md: '7' }}
          bg="bg.panel"
        >
          <Heading size="lg">
            {checkoutAllowed
              ? 'Escolha sua modalidade'
              : 'Programar modalidade para o próximo ciclo'}
          </Heading>
          <Text color="fg.muted" mt="2" mb="5">
            {checkoutAllowed
              ? 'Cobrança recorrente após contratação. O pagamento é feito na página segura da Stripe.'
              : 'A modalidade atual permanece até a próxima renovação, sem cobrança proporcional agora.'}
          </Text>
          <HStack gap="4" align="end" flexWrap="wrap">
            <Box minW="240px">
              <label htmlFor="billing-interval">Modalidade</label>
              <NativeSelect.Root mt="2">
                <NativeSelect.Field
                  id="billing-interval"
                  value={interval}
                  onChange={(event) =>
                    setInterval(billingIntervalSchema.parse(event.target.value))
                  }
                >
                  <option value="monthly">Mensal · R$ 35,00/mês</option>
                  <option value="annual">
                    Anual · R$ 350,00/ano antecipado
                  </option>
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
            </Box>
            <Button
              disabled={
                command.isPending ||
                (!checkoutAllowed &&
                  interval === paid?.billingInterval &&
                  !paid.nextBillingInterval)
              }
              onClick={() =>
                command.mutate({
                  type: checkoutAllowed ? 'checkout' : 'interval',
                  interval,
                })
              }
            >
              {checkoutAllowed ? 'Continuar para pagamento' : 'Programar troca'}
            </Button>
          </HStack>
        </Box>
      )}
      {cancel && paidActive && !paid?.cancellationRequested && (
        <Box borderWidth="1px" rounded="2xl" p="6">
          <Heading size="md">Cancelar a próxima renovação</Heading>
          <Text mt="2" mb="4">
            Sem multa. O acesso continua até o fim do período pago. O
            cancelamento não gera reembolso proporcional automático.
          </Text>
          {!confirmCancel ? (
            <Button variant="outline" onClick={() => setConfirmCancel(true)}>
              Solicitar cancelamento
            </Button>
          ) : (
            <HStack flexWrap="wrap">
              <Button
                colorPalette="red"
                disabled={command.isPending}
                onClick={() => command.mutate({ type: 'cancel' })}
              >
                Confirmar cancelamento da renovação
              </Button>
              <Button variant="ghost" onClick={() => setConfirmCancel(false)}>
                Voltar
              </Button>
            </HStack>
          )}
        </Box>
      )}
      {(!paid || paid.contractorUserId === context.user.id) && (
        <SubscriptionNotices workspace={workspace} />
      )}
    </Stack>
  )
}
