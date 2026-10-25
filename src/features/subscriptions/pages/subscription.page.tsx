import { Box, Button, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import { Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

import { ColorModeButton } from '@/components/ui/color-mode'
import { colorDefaultTheme } from '@/shared/constants/color-default-theme'

import { SubscriptionOrganizationSelect } from '../components/subscription-organization-select'
import { SubscriptionSection } from '../components/subscription-section'
import { SubscriptionWorkspaceProvider } from '../components/subscription-workspace-provider'
import { useSubscriptionOrganizationContext } from '../hooks/use-subscription-organization-context'
import { SubscriptionWorkspace } from './subscription-workspace'

export function SubscriptionPageContent() {
  const {
    authenticationSession,
    userId,
    organizationId,
    subscriptionContextQuery,
    retryOrganizationQueries,
    organizationQueryError,
    canShowSubscriptionWorkspace,
  } = useSubscriptionOrganizationContext()

  const isLoadingSubscriptionContextSession =
    authenticationSession.isPending || subscriptionContextQuery.isLoading

  return (
    <Box
      minH="100dvh"
      bg="app.bg"
      colorPalette={colorDefaultTheme}
      py={{ base: '6', md: '10' }}
      px={{ base: '4', md: '8' }}
    >
      <Stack maxW="1100px" mx="auto" gap="7">
        <HStack justify="space-between" flexWrap="wrap" gap="4">
          <div>
            <Text color="colorPalette.fg" fontWeight="semibold" fontSize="sm">
              SUA CONTA
            </Text>
            <Heading size="3xl" mt="1">
              Assinatura
            </Heading>
            <Text color="fg.muted" mt="2">
              Plano, acesso e pagamentos da sua organização.
            </Text>
          </div>

          <HStack>
            <Button asChild variant="outline" rounded="lg">
              <Link to="/establishment">
                <ArrowLeft size={16} />
                Voltar ao painel
              </Link>
            </Button>

            <ColorModeButton rounded="full" variant="ghost" size="sm" />
          </HStack>
        </HStack>

        <SubscriptionOrganizationSelect />

        {organizationQueryError && (
          <SubscriptionSection role="alert">
            <Text>{organizationQueryError.message}</Text>

            <Button mt="3" variant="outline" onClick={retryOrganizationQueries}>
              Tentar novamente
            </Button>
          </SubscriptionSection>
        )}

        {isLoadingSubscriptionContextSession && (
          <Text role="status">Carregando contexto autenticado…</Text>
        )}

        {canShowSubscriptionWorkspace && subscriptionContextQuery.data && (
          <SubscriptionWorkspaceProvider key={`${userId}:${organizationId}`}>
            <SubscriptionWorkspace />
          </SubscriptionWorkspaceProvider>
        )}
      </Stack>
    </Box>
  )
}
