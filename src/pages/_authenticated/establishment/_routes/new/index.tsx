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
        <Header.Title>Cadastrar estabelecimento</Header.Title>
      </Header.Root>

      <FormCreateEstablishmentPage />
    </Box>
  )
}
