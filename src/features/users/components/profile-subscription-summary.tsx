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

import { cardSectionCss } from '@/theme/styles/global-styles'

import { useProfileSubscription } from '../hooks/use-profile-subscription'

export function ProfileSubscriptionSummary() {
  const { canShowSummary, subscriptionQuery, summaryItems, snapshot } =
    useProfileSubscription()

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
