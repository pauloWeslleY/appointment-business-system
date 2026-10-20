import {
  Badge,
  Box,
  Button,
  Heading,
  HStack,
  Stack,
  Text,
} from '@chakra-ui/react'

import type { useSubscriptionWorkspace } from '../hooks/use-subscription-workspace'
import { formatSubscriptionDate } from '../policies/subscription-view'
import { SubscriptionApiError } from '../services/subscription-client'

export function SubscriptionNotices({
  workspace,
}: {
  workspace: ReturnType<typeof useSubscriptionWorkspace>
}) {
  const { notices, readNotice, noticesUnavailable } = workspace
  const forbidden =
    notices.error instanceof SubscriptionApiError &&
    notices.error.status === 403

  return (
    <Box
      borderWidth="1px"
      rounded="2xl"
      p={{ base: '5', md: '7' }}
      bg="bg.panel"
    >
      <Heading size="lg" mb="4">
        Avisos da assinatura
      </Heading>
      {noticesUnavailable && (
        <Text color="fg.muted">
          Os avisos ainda não estão disponíveis neste ambiente.
        </Text>
      )}
      {notices.isLoading && <Text role="status">Carregando avisos…</Text>}
      {forbidden && (
        <Text color="fg.muted">
          Os avisos financeiros são exclusivos do contratante.
        </Text>
      )}
      {notices.isError && !noticesUnavailable && !forbidden && (
        <Text role="alert">
          Não foi possível consultar os avisos.{' '}
          <Button variant="plain" onClick={() => notices.refetch()}>
            Tentar novamente
          </Button>
        </Text>
      )}
      {notices.data?.notices.length === 0 && (
        <Text color="fg.muted">Nenhum aviso publicado.</Text>
      )}
      {readNotice.isError && (
        <Text role="alert" color="red.600">
          Não foi possível marcar o aviso como lido.
        </Text>
      )}
      <Stack gap="4">
        {notices.data?.notices.map((notice) => (
          <Box key={notice.id} borderWidth="1px" rounded="xl" p="4">
            <HStack justify="space-between" flexWrap="wrap" mb="2">
              <Heading size="sm">{notice.subject}</Heading>
              <Badge colorPalette={notice.readAt ? 'gray' : 'teal'}>
                {notice.readAt ? 'Lido' : 'Novo'}
              </Badge>
            </HStack>
            <Text whiteSpace="pre-line" fontSize="sm">
              {notice.text}
            </Text>
            <Text color="fg.muted" fontSize="xs" mt="3">
              Publicado em {formatSubscriptionDate(notice.publishedAt)} (São
              Paulo)
            </Text>
            {notice.obsoleteAt && (
              <Text fontSize="xs" color="fg.muted">
                Histórico: a situação deste aviso já mudou. Consulte o estado
                atual acima.
              </Text>
            )}
            {!notice.readAt && (
              <Button
                mt="3"
                size="sm"
                variant="outline"
                disabled={readNotice.isPending}
                onClick={() => readNotice.mutate(notice.id)}
              >
                Marcar como lido
              </Button>
            )}
          </Box>
        ))}
      </Stack>
    </Box>
  )
}
