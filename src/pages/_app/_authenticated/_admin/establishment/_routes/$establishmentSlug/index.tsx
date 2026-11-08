import { Box, Card, HStack } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import { PencilLine } from 'lucide-react'
import { z } from 'zod'

import Header from '@/components/layout/header'
import { MENU_UPDATE_ESTABLISHMENT } from '@/features/establishment/constants/menu-tab-establishment-update'
import UpdateEstablishmentPage from '@/features/establishment/pages/update-establishment.page'
import { establishmentAdminSlugQueryOptions } from '@/features/establishment/queries/establishment.query-options'
import { PERMISSION_ACTIONS, RESOURCES } from '@/shared/constants/permission'
import { validateRoutePermission } from '@/shared/validations/validate-route-permission'
import { cardSectionCss } from '@/theme/styles/global-styles'

export const Route = createFileRoute(
  '/_app/_authenticated/_admin/establishment/_routes/$establishmentSlug/',
)({
  head: () => ({
    meta: [{ title: 'Editar estabelecimento | Agendros' }],
  }),
  beforeLoad: ({ context }) =>
    validateRoutePermission(context.memberContext, {
      resource: RESOURCES.ESTABLISHMENT,
      action: PERMISSION_ACTIONS.READ,
    }),
  validateSearch: z.object({
    tab: z.enum(MENU_UPDATE_ESTABLISHMENT).optional(),
  }),
  loader: ({ context, params }) =>
    context.queryClient.query(
      establishmentAdminSlugQueryOptions(params.establishmentSlug),
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
