import { Box, Card, HStack } from '@chakra-ui/react'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { PencilLine } from 'lucide-react'
import { z } from 'zod'

import Header from '@/components/layout/header'
import UpdateEstablishmentPage from '@/features/establishment/pages/update-establishment.page'
import { establishmentSlugQueryOptions } from '@/features/establishment/queries/establishment-query-options'
import { cardSectionCss } from '@/theme/styles/global-styles'

export const Route = createFileRoute(
  '/_authenticated/establishment/_routes/$establishmentSlug/',
)({
  validateSearch: z.object({
    tab: z.enum(['edit', 'upload']),
  }),
  beforeLoad: ({ search, params }) => {
    if (!search.tab) {
      throw redirect({
        to: '/establishment/$establishmentSlug',
        params: { establishmentSlug: params.establishmentSlug },
        search: { tab: 'edit' },
      })
    }
  },
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(
      establishmentSlugQueryOptions(params.establishmentSlug),
    ),
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

      <Card.Root variant="outline" css={cardSectionCss}>
        <Card.Header p="0" pb="4">
          <Card.Title lineHeight="1">Informações do estabelecimento</Card.Title>
          <Card.Description>
            Aqui você pode atualizar as informações do seu estabelecimento.
          </Card.Description>
        </Card.Header>

        <UpdateEstablishmentPage />
      </Card.Root>
    </Box>
  )
}
