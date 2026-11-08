import { Box, Card } from '@chakra-ui/react'
import { createFileRoute, getRouteApi } from '@tanstack/react-router'

import Header from '@/components/layout/header'
import CreateProfessionalForm from '@/features/professionals/components/create-professional-form'
import { PERMISSION_ACTIONS, RESOURCES } from '@/shared/constants/permission'
import { validateRoutePermission } from '@/shared/validations/validate-route-permission'
import { cardSectionCss } from '@/theme/styles/global-styles'

const dashboardRoute = getRouteApi('/_app/_authenticated/dashboard/$slug')

export const Route = createFileRoute(
  '/_app/_authenticated/dashboard/$slug/professionals/_pages/new/',
)({
  head: () => ({
    meta: [{ title: 'Novo profissional | Agendros' }],
  }),
  beforeLoad: ({ context }) =>
    validateRoutePermission(context.member.memberContext, {
      resource: RESOURCES.PROFESSIONAL,
      action: PERMISSION_ACTIONS.CREATE,
    }),
  component: CreateProfessionalPage,
})

function CreateProfessionalPage() {
  const { establishment } = dashboardRoute.useLoaderData()
  const navigate = Route.useNavigate()

  return (
    <Box spaceY={{ base: '4', lg: '6' }} pb="4">
      <Header.Root>
        <Header.Button />
        <Header.Title>Novo profissional</Header.Title>
      </Header.Root>

      <Card.Root variant="outline" css={cardSectionCss}>
        <CreateProfessionalForm
          establishmentId={establishment.id}
          onSaved={() =>
            navigate({
              to: '/dashboard/$slug/professionals',
              params: { slug: establishment.slug },
            })
          }
        />
      </Card.Root>
    </Box>
  )
}
