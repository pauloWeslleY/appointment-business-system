import { Alert, Box } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

import Header from '@/components/layout/header'
import StepCreateEstablishmentPage from '@/features/establishment/pages/step-create-establishment.page'

export const Route = createFileRoute(
  '/_authenticated/establishment/_routes/new/',
)({
  validateSearch: z.object({
    step: z.coerce.number().optional().default(0),
  }),
  component: CreateEstablishmentPage,
})

function CreateEstablishmentPage() {
  const { memberContext } = Route.useRouteContext()
  const verifyEstablishments = memberContext.establishments.length === 0

  return (
    <Box spaceY={{ base: '4', lg: '6' }} w="full">
      <Header.Root>
        <Header.Button />
        <Header.Title>Cadastrar estabelecimento</Header.Title>
      </Header.Root>

      <Box spaceY="4">
        {verifyEstablishments && (
          <Alert.Root status="info" variant="surface" rounded="xl">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>Cadastro necessário</Alert.Title>
              <Alert.Description>
                O Perfil da sua empresa não possui estabelecimento cadastrado.
                <br />
                Conclua esta etapa para configurar seus estabelecimentos e
                gerenciar seus agendamentos.
              </Alert.Description>
            </Alert.Content>
          </Alert.Root>
        )}

        <StepCreateEstablishmentPage />
      </Box>
    </Box>
  )
}
