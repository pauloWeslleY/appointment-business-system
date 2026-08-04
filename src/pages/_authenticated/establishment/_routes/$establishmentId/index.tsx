import { Box, HStack } from '@chakra-ui/react'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { PencilLine } from 'lucide-react'
import { z } from 'zod'

import Header from '@/components/layout/header'
import UpdateEstablishmentPage from '@/features/establishment/pages/update-establishment.page'

export const Route = createFileRoute(
  '/_authenticated/establishment/_routes/$establishmentId/',
)({
  validateSearch: z.object({
    tab: z.enum(['edit', 'upload']),
  }),
  beforeLoad: ({ search, params }) => {
    if (!search.tab) {
      throw redirect({
        to: '/establishment/$establishmentId',
        search: {
          tab: 'edit',
        },
        params: {
          establishmentId: params.establishmentId,
        },
      })
    }
  },
  component: EditEstablishmentPage,
})

function EditEstablishmentPage() {
  return (
    <Box spaceY={{ base: '4', lg: '6' }} w="full">
      <Header.Root>
        <Header.Button />
        <HStack gap="2" align="center">
          <Header.Icon icon={PencilLine} />
          <Header.Title>Editar estabelecimento</Header.Title>
        </HStack>
      </Header.Root>

      <UpdateEstablishmentPage />
    </Box>
  )
}
