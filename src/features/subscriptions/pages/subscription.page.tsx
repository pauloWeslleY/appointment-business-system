import {
  Box,
  Button,
  Heading,
  HStack,
  NativeSelect,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Link } from '@tanstack/react-router'

import { useSubscriptionOrganization } from '../hooks/use-subscription-organization'
import { SubscriptionWorkspace } from './subscription-workspace'

export function SubscriptionPage({
  entry = 'default',
}: {
  entry?: 'default' | 'return' | 'cancel'
}) {
  const { session, userId, organizationId, organizations, selection, context } =
    useSubscriptionOrganization()
  const error = selection.error ?? organizations.error ?? context.error

  return (
    <Box
      minH="100dvh"
      bg="bg.subtle"
      py={{ base: '6', md: '10' }}
      px={{ base: '4', md: '8' }}
    >
      <Stack maxW="1100px" mx="auto" gap="7">
        <HStack justify="space-between" flexWrap="wrap" gap="4">
          <Box>
            <Text color="teal.600" fontWeight="semibold" fontSize="sm">
              SUA CONTA
            </Text>
            <Heading size="3xl" mt="1">
              Assinatura
            </Heading>
            <Text color="fg.muted" mt="2">
              Plano, acesso e pagamentos da sua organização.
            </Text>
          </Box>
          <Link to="/establishment">Voltar ao painel</Link>
        </HStack>
        <Box bg="bg.panel" borderWidth="1px" rounded="2xl" p="5">
          <label htmlFor="subscription-organization">Organização</label>
          <NativeSelect.Root
            mt="2"
            maxW="500px"
            disabled={selection.isPending || organizations.isLoading}
          >
            <NativeSelect.Field
              id="subscription-organization"
              value={organizationId}
              onChange={(event) => {
                if (event.target.value) {
                  selection.mutate(event.target.value)
                }
              }}
            >
              <option value="">Selecione uma organização</option>
              {organizations.data?.map((organization) => (
                <option key={organization.id} value={organization.id}>
                  {organization.name}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
          {organizations.data?.length === 0 && (
            <Text mt="3">
              Sua conta ainda não possui uma organização. Conclua o cadastro da
              empresa antes de iniciar uma contratação.
            </Text>
          )}
          {selection.isPending && (
            <Text mt="3" role="status">
              Atualizando organização ativa…
            </Text>
          )}
        </Box>
        {error && (
          <Box role="alert" borderWidth="1px" rounded="xl" p="5">
            <Text>{error.message}</Text>
            <Button
              mt="3"
              variant="outline"
              onClick={() => {
                organizations.refetch()
                context.refetch()
              }}
            >
              Tentar novamente
            </Button>
          </Box>
        )}
        {(session.isPending || context.isLoading) && (
          <Text role="status">Carregando contexto autenticado…</Text>
        )}
        {userId &&
          context.data &&
          !selection.isPending &&
          context.data.organization.id === organizationId && (
            <SubscriptionWorkspace
              key={`${userId}:${organizationId}`}
              context={context.data}
              entry={entry}
            />
          )}
      </Stack>
    </Box>
  )
}
