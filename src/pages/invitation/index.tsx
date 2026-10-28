import { Alert, Box, Button, Flex, Icon, Text } from '@chakra-ui/react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { MailOpen, ShieldCheck } from 'lucide-react'
import z from 'zod'

import Logotipo from '@/components/logotipo'
import AuthLayoutContainer from '@/features/authentication/layout/authentication-layout'
import AuthAcceptInvitation from '@/features/invitations/pages/auth-accept-invitations'
import { authClient } from '@/lib/auth'
import { setCookie } from '@/shared/cache/cookie'

export const Route = createFileRoute('/invitation/')({
  validateSearch: z.object({
    invitationId: z.string().optional(),
  }),
  beforeLoad: async ({ search }) => {
    if (search.invitationId) {
      const query = new URLSearchParams({ invitationId: search.invitationId })
      setCookie('redirectTo', `/invitation?${query.toString()}`)
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { data: session } = authClient.useSession()
  const search = Route.useSearch()

  if (!session) {
    return (
      <AuthLayoutContainer>
        <Box spaceY="4">
          <Flex align="center" gap="2" justify="center">
            <Logotipo variant="horizontal" w="44" h="auto" />
          </Flex>

          <Alert.Root
            status="info"
            variant="surface"
            rounded="xl"
            display="flex"
            flexDirection="column"
            gap="4"
          >
            <Flex
              alignSelf="center"
              placeContent="center"
              p="4"
              w="fit"
              rounded="full"
              bg={{ _light: 'slate.200/60', _dark: 'slate.900/20' }}
            >
              <Icon
                as={MailOpen}
                boxSize="6"
                color={{ _light: 'sea.500', _dark: 'sea.300' }}
              />
            </Flex>

            <Alert.Content textAlign="center" w="full" spaceY="4">
              <Alert.Title fontSize="xl">Você recebeu um convite!</Alert.Title>
              <Alert.Description>
                <p>
                  Entre na sua conta para visualizar e aceitar o convite da
                  organização.
                </p>
              </Alert.Description>
            </Alert.Content>

            <Flex flexDir="column" align="center" gap="4" mt="4" w="full">
              <Button asChild variant="solid" rounded="xl" w="full">
                <Link to="/login">Faça login</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                colorPalette="brand"
                rounded="xl"
                w="full"
              >
                <Link to="/register">Registre-se</Link>
              </Button>
            </Flex>

            <Flex align="center" gap="2" alignSelf="center">
              <Icon
                as={ShieldCheck}
                boxSize="4"
                color={{ _light: 'sea.500', _dark: 'sea.300' }}
              />
              <Text fontSize="xs">
                Você poderá analisar o convite antes de aceitá-lo.
              </Text>
            </Flex>
          </Alert.Root>
        </Box>
      </AuthLayoutContainer>
    )
  }

  return (
    <AuthLayoutContainer>
      <AuthAcceptInvitation invitationId={search.invitationId} />
    </AuthLayoutContainer>
  )
}
