import { Box, Card, HStack } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import { PencilLine } from 'lucide-react'

import Header from '@/components/layout/header'
import FormUpdateServiceEstablishment from '@/features/service-establishment/pages/form-update-service-establishment'
import { PERMISSION_ACTIONS, RESOURCES } from '@/shared/constants/permission'
import { validateRoutePermission } from '@/shared/validations/validate-route-permission'
import { cardSectionCss } from '@/theme/styles/global-styles'

export const Route = createFileRoute(
  '/_app/_authenticated/dashboard/$slug/services/_pages/$serviceEstablishmentId/edit/',
)({
  head: () => ({
    meta: [{ title: 'Atualizar serviço' }],
  }),
  beforeLoad: ({ context }) =>
    validateRoutePermission(context.member.memberContext, {
      resource: RESOURCES.SERVICE,
      action: PERMISSION_ACTIONS.UPDATE,
    }),
  component: EditServiceEstablishmentPage,
})

function EditServiceEstablishmentPage() {
  return (
    <Box spaceY={{ base: '4', lg: '6' }}>
      <Header.Root>
        <Header.Button />

        <HStack gap="2" align="center">
          <Header.Icon icon={PencilLine} />
          <Header.Title>Atualizar Serviço</Header.Title>
        </HStack>
      </Header.Root>

      <Card.Root variant="outline" css={cardSectionCss}>
        <FormUpdateServiceEstablishment />
      </Card.Root>
    </Box>
  )
}
