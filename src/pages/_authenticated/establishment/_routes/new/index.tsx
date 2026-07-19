import { Box } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'

import Header from '@/components/layout/header'
import FormCreateEstablishmentPage from '@/features/establishment/pages/form-create-establishment.page'

export const Route = createFileRoute(
  '/_authenticated/establishment/_routes/new/',
)({
  component: CreateEstablishmentPage,
})

function CreateEstablishmentPage() {
  return (
    <Box spaceY={{ base: '4', lg: '6' }} w="full">
      <Header.Root>
        <Header.Button />
        <div>
          <Header.Title>Cadastrar estabelecimento</Header.Title>
          <Header.SubTitle>
            Após o cadastro, você poderá gerenciar os serviços e agendamentos do
            estabelecimento.
          </Header.SubTitle>
        </div>
      </Header.Root>

      <FormCreateEstablishmentPage />
    </Box>
  )
}
