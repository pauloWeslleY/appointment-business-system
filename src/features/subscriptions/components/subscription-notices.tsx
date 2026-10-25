import {
  Badge,
  Box,
  Button,
  Heading,
  HStack,
  Stack,
  Text,
} from '@chakra-ui/react'

import { useSubscriptionNotices } from '../hooks/use-subscription-notices'
import { formatSubscriptionDate } from '../policies/subscription-view'
import { SubscriptionSection } from './subscription-section'

export function SubscriptionNotices() {
  const {
    subscriptionNoticesQuery,
    markNoticeReadMutation,
    areSubscriptionNoticesUnavailable,
    isNoticeAccessDenied,
    refreshSubscriptionNotices,
    handleMarkNoticeRead,
  } = useSubscriptionNotices()
  return (
    <SubscriptionSection>
      <Heading size="lg" mb="4">
        Avisos da assinatura
      </Heading>
      {areSubscriptionNoticesUnavailable && (
        <Text color="fg.muted">
          Os avisos ainda não estão disponíveis neste ambiente.
        </Text>
      )}
      {subscriptionNoticesQuery.isLoading && (
        <Text role="status">Carregando avisos…</Text>
      )}
      {isNoticeAccessDenied && (
        <Text color="fg.muted">
          Não foi possível autorizar a consulta dos avisos. Verifique sua sessão
          e permissões.
        </Text>
      )}
      {subscriptionNoticesQuery.isError &&
        !areSubscriptionNoticesUnavailable &&
        !isNoticeAccessDenied && (
          <Text role="alert">
            Não foi possível consultar os avisos.{' '}
            <Button variant="plain" onClick={refreshSubscriptionNotices}>
              Tentar novamente
            </Button>
          </Text>
        )}
      {subscriptionNoticesQuery.data?.notices.length === 0 && (
        <Text color="fg.muted">Nenhum aviso publicado.</Text>
      )}
      {markNoticeReadMutation.isError && (
        <Text role="alert" color="red.fg">
          Não foi possível marcar o aviso como lido.
        </Text>
      )}
      <Stack gap="4">
        {subscriptionNoticesQuery.data?.notices.map((notice) => (
          <Box key={notice.id} borderWidth="1px" rounded="xl" p="4">
            <HStack justify="space-between" flexWrap="wrap" mb="2">
              <Heading size="sm">{notice.subject}</Heading>
              <Badge colorPalette={notice.readAt ? 'gray' : 'green'}>
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
                disabled={markNoticeReadMutation.isPending}
                onClick={() => handleMarkNoticeRead(notice.id)}
              >
                Marcar como lido
              </Button>
            )}
          </Box>
        ))}
      </Stack>
    </SubscriptionSection>
  )
}
