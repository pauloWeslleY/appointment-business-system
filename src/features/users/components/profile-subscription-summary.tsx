import {
  Badge,
  Button,
  Card,
  DataList,
  For,
  Skeleton,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Link } from '@tanstack/react-router'
import { useMemo } from 'react'

import { formatSubscriptionDate } from '@/features/subscriptions/policies/subscription-view'
import { mapLabelBillingInterval } from '@/features/subscriptions/types/billing-interval.type'
import {
  mapLabelSubscriptionStatus,
  mapLabelSubscriptionStatusColor,
} from '@/features/subscriptions/types/subscription-status.type'
import { cardSectionCss } from '@/theme/styles/global-styles'

import { useProfileSubscription } from '../hooks/use-profile-subscription'

export function ProfileSubscriptionSummary() {
  const { canShowSummary, subscriptionQuery } = useProfileSubscription()
  const snapshot = subscriptionQuery.data

  const summaryItems = useMemo(() => {
    if (!snapshot) {
      return []
    }

    const { subscription, access } = snapshot
    const isTrial = access.status === 'trialing'
    const isRenewing =
      subscription &&
      !subscription.cancellationRequested &&
      access.status === 'active'

    let planLabel = 'Sem assinatura contratada'
    if (subscription) {
      planLabel = `Básico · ${mapLabelBillingInterval[subscription.billingInterval]}`
    } else if (isTrial) {
      planLabel = 'Teste gratuito'
    }

    let endDateLabel = 'Fim do período pago'
    if (isTrial) {
      endDateLabel = 'Fim do teste gratuito'
    } else if (isRenewing) {
      endDateLabel = 'Próxima renovação'
    } else if (access.canWrite) {
      endDateLabel = 'Acesso até'
    }

    let endDate = access.operationalUntil ?? subscription?.paidUntil ?? null
    if (isRenewing) {
      endDate = subscription.paidUntil
    }

    return [
      { label: 'Plano atual', value: planLabel },
      {
        label: 'Status da assinatura',
        value: mapLabelSubscriptionStatus[access.status],
        colorPalette: mapLabelSubscriptionStatusColor[access.status],
      },
      {
        label: 'Início da assinatura',
        value: formatSubscriptionDate(subscription?.createdAt ?? null),
      },
      { label: endDateLabel, value: formatSubscriptionDate(endDate) },
    ]
  }, [snapshot])

  if (!canShowSummary) {
    return null
  }

  return (
    <Card.Root variant="outline" css={cardSectionCss} h="fit">
      <Text fontSize="lg" fontWeight="bold" mb="4">
        Resumo da assinatura
      </Text>

      {subscriptionQuery.isPending && (
        <Stack gap="4" role="status" aria-label="Carregando assinatura">
          <Skeleton h="5" />
          <Skeleton h="5" />
          <Skeleton h="5" />
          <Skeleton h="5" />
        </Stack>
      )}

      {subscriptionQuery.isError && (
        <Stack gap="3">
          <Text role="alert">Não foi possível carregar a assinatura.</Text>
          <Button
            variant="outline"
            rounded="lg"
            loading={subscriptionQuery.isFetching}
            onClick={() => void subscriptionQuery.refetch()}
          >
            Tentar novamente
          </Button>
        </Stack>
      )}

      {!subscriptionQuery.isPending &&
        !subscriptionQuery.isError &&
        snapshot && (
          <Stack gap="4">
            <DataList.Root orientation="horizontal">
              <For each={summaryItems}>
                {(item) => (
                  <DataList.Item key={item.label}>
                    <DataList.ItemLabel>{item.label}</DataList.ItemLabel>
                    <DataList.ItemValue>
                      {item.colorPalette && (
                        <Badge
                          variant="surface"
                          colorPalette={item.colorPalette}
                        >
                          {item.value}
                        </Badge>
                      )}
                      {!item.colorPalette && item.value}
                    </DataList.ItemValue>
                  </DataList.Item>
                )}
              </For>
            </DataList.Root>
            <Text fontSize="xs" color="fg.muted">
              Datas no horário de São Paulo.
            </Text>
          </Stack>
        )}

      <Button asChild variant="outline" rounded="lg" mt="4">
        <Link to="/subscription">Gerenciar assinatura</Link>
      </Button>
    </Card.Root>
  )
}
