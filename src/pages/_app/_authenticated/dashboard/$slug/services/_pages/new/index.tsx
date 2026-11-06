import { Box, Card } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'

import Header from '@/components/layout/header'
import FormCreateServiceEstablishment from '@/features/service-establishment/pages/form-create-service-establishment.page'
import { PERMISSION_ACTIONS, RESOURCES } from '@/shared/constants/permission'
import { validateRoutePermission } from '@/shared/validations/validate-route-permission'
import { cardSectionCss } from '@/theme/styles/global-styles'

export const Route = createFileRoute(
  '/_app/_authenticated/dashboard/$slug/services/_pages/new/',
)({
  beforeLoad: ({ context }) =>
    validateRoutePermission(context.member.memberContext, {
      resource: RESOURCES.SERVICE,
      action: PERMISSION_ACTIONS.CREATE,
    }),
  component: CreateServicePage,
})

function CreateServicePage() {
  return (
    <Box spaceY={{ base: '4', lg: '6' }}>
      <Header.Root>
        <Header.Button />
        <Header.Title>Novo Serviço</Header.Title>
      </Header.Root>

      <Card.Root variant="outline" css={cardSectionCss}>
        <FormCreateServiceEstablishment />
      </Card.Root>
    </Box>
  )
}
