import { Box, HStack } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'

import Header from '@/components/layout/header'
import FormUpdateServiceEstablishment from '@/features/service-establishment/pages/form-update-service-establishment'

export const Route = createFileRoute(
  '/dashboard/$establishmentId/services/_pages/$serviceEstablishmentId/edit/',
)({
  component: EditServiceEstablishmentPage,
})

function EditServiceEstablishmentPage() {
  return (
    <Box spaceY={{ base: '4', lg: '6' }}>
      <Header.Root>
        <HStack align="center">
          <Header.Button />

          <div>
            <Header.Title>Atualizar Serviço</Header.Title>
            <Header.SubTitle>
              Atualize as informações do serviço para o seu estabelecimento
            </Header.SubTitle>
          </div>
        </HStack>
      </Header.Root>

      <FormUpdateServiceEstablishment />
    </Box>
  )
}
