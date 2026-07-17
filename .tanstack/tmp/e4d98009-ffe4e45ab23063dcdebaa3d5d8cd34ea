import { Box } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'

import Header from '@/components/layout/header'
import FormUpdateEstablishment from '@/features/establishment/pages/form-update-establishment.page'

export const Route = createFileRoute(
  '/_authenticated/establishment/_routes/$establishmentId/',
)({
  component: EditEstablishmentPage,
})

function EditEstablishmentPage() {
  return (
    <Box spaceY={{ base: '4', lg: '6' }} w="full">
      <Header.Root>
        <Header.Button />
        <div>
          <Header.Title>Editar estabelecimento</Header.Title>
          <Header.SubTitle>
            Edite as informações do seu estabelecimento.
          </Header.SubTitle>
        </div>
      </Header.Root>

      <FormUpdateEstablishment />
    </Box>
  )
}
