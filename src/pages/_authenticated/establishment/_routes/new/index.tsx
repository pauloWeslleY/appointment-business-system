import { Box } from '@chakra-ui/react'
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
  return (
    <Box spaceY={{ base: '4', lg: '6' }} w="full">
      <Header.Root>
        <Header.Button />
        <Header.Title>Cadastrar estabelecimento</Header.Title>
      </Header.Root>

      <StepCreateEstablishmentPage />
    </Box>
  )
}
