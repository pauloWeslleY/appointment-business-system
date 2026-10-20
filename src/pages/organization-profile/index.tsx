import {
  Alert,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Separator,
  Stack,
} from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import { Building2, LogOut } from 'lucide-react'

import Header from '@/components/layout/header'
import { ColorModeButton } from '@/components/ui/color-mode'
import { toaster } from '@/components/ui/toaster'
import FormCreateOrganizationProfile from '@/features/organization-profile/pages/form-create-organization-profile'
import { authClient } from '@/lib/auth'
import { useLogout } from '@/shared/hooks/use-logout'
import { cardSectionCss } from '@/theme/styles/global-styles'

export const Route = createFileRoute('/organization-profile/')({
  loader: async () => await authClient.organization.list(),
  component: OrganzationProfilePage,
})

function OrganzationProfilePage() {
  const organization = Route.useLoaderData()
  const navigate = Route.useNavigate()
  const { handleLogout } = useLogout()

  const handleBackToDashboard = () => {
    if (organization.error) {
      toaster.warning({
        title: 'Erro ao acessar o painel',
        description:
          'Não foi possível carregar as informações do perfil empresarial.',
      })
      return
    }

    if (organization.data.length === 0) {
      toaster.warning({
        title: 'Atenção',
        description: 'Sua conta ainda não possui um perfil empresarial.',
      })
      return
    }

    navigate({ to: '/organization' })
  }

  return (
    <Container maxW="breakpoint.md" py={{ base: '4', md: '10' }} pos="relative">
      <Box pos="absolute" top="2" right="-219px">
        <ColorModeButton rounded="full" variant="ghost" />
      </Box>

      <Header.Root align="center">
        <Header.Icon icon={Building2} />
        <Stack gap="0">
          <Header.Title>Configure seu perfil empresarial</Header.Title>
          <Header.SubTitle>
            Preencha os dados da sua empresa para começar a utilizar o sistema.
          </Header.SubTitle>
        </Stack>
      </Header.Root>

      <Stack mt="8">
        <Alert.Root status="info" variant="surface" rounded="xl">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Cadastro necessário</Alert.Title>
            <Alert.Description>
              Sua conta ainda não possui um perfil empresarial. Conclua esta
              etapa para configurar seus estabelecimentos e gerenciar seus
              agendamentos.
            </Alert.Description>
          </Alert.Content>

          <Flex align="center" gap="2">
            <Button
              variant="outline"
              rounded="md"
              size="2xs"
              onClick={handleBackToDashboard}
            >
              Voltar para o painel
            </Button>
            <Button
              colorPalette="gray"
              variant="surface"
              rounded="md"
              size="2xs"
              onClick={handleLogout}
            >
              <LogOut />
              Sair
            </Button>
          </Flex>
        </Alert.Root>

        <Separator my="4" mx="8" />

        <Card.Root variant="outline" css={cardSectionCss} h="fit">
          <Card.Header>
            <Card.Title>Dados da empresa</Card.Title>
            <Card.Description>
              Informe os dados de identificação e contato.
            </Card.Description>
          </Card.Header>

          <Card.Body>
            <FormCreateOrganizationProfile />
          </Card.Body>
        </Card.Root>
      </Stack>
    </Container>
  )
}
