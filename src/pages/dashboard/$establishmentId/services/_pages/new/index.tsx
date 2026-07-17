import { Box, HStack } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'

import Header from '@/components/layout/header'
import FormCreateServiceEstablishment from '@/features/service-establishment/pages/form-create-service-establishment.page'

export const Route = createFileRoute(
  '/dashboard/$establishmentId/services/_pages/new/',
)({
  component: CreateServicePage,
})

function CreateServicePage() {
  return (
    <Box spaceY={{ base: '4', lg: '6' }}>
      <Header.Root>
        <HStack align="center">
          <Header.Button />

          <div>
            <Header.Title>Novo Serviço</Header.Title>
            <Header.SubTitle>
              Cadastre um novo serviço para o seu estabelecimento
            </Header.SubTitle>
          </div>
        </HStack>
      </Header.Root>

      <FormCreateServiceEstablishment />
    </Box>
  )
}
