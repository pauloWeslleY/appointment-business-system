import { Box, HStack } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import z from 'zod'

import Header from '@/components/layout/header'
import ListEstablishmentPage from '@/features/establishment/pages/list-establishment.page'
import { establishmentGuardBeforeLoadRoute } from '@/features/establishment/services/establishment-guard-before-load-route'

export const Route = createFileRoute('/_authenticated/establishment/')({
  validateSearch: z.object({
    q: z.string().optional(),
  }),
  beforeLoad: establishmentGuardBeforeLoadRoute,
  component: EstablishmentPage,
})

function EstablishmentPage() {
  return (
    <Box spaceY={{ base: '4', lg: '8' }}>
      <Header.Root>
        <HStack align="center">
          <Header.Button />
          <div>
            <Header.Title>Estabelecimentos</Header.Title>
            <Header.SubTitle>
              Mantenha seus estabelecimentos sempre atualizados e bem
              organizados.
            </Header.SubTitle>
          </div>
        </HStack>
      </Header.Root>

      <ListEstablishmentPage />
    </Box>
  )
}
