import { Card } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import { getRouteApi } from '@tanstack/react-router'
import { MailOpen } from 'lucide-react'
import z from 'zod'

import EmptyStateTeamManagement from '@/components/empty-state-team-management'
import DialogSendInvite from '@/features/invitations/components/dialog-send-invite'
import ListInvitesSendPage from '@/features/invitations/pages/list-invites-send'
import { PERMISSION_ACTIONS, RESOURCES } from '@/shared/constants/permission'
import { validateRoutePermission } from '@/shared/validations/validate-route-permission'
import { cardSectionCss } from '@/theme/styles/global-styles'

export const Route = createFileRoute(
  '/_app/_authenticated/_admin/team-management/invitations/',
)({
  beforeLoad: ({ context }) =>
    validateRoutePermission(context.memberContext, {
      resource: RESOURCES.INVITATION,
      action: PERMISSION_ACTIONS.CREATE,
    }),
  validateSearch: z.object({
    q: z.string().optional(),
  }),
  component: InvitationPage,
})

const routeTeamManagement = getRouteApi(
  '/_app/_authenticated/_admin/team-management',
)

function InvitationPage() {
  const teamManagementRoute = routeTeamManagement.useLoaderData()

  if (teamManagementRoute.totalInvitations === '0') {
    return (
      <EmptyStateTeamManagement
        icon={MailOpen}
        title="Nenhum convite encontrado"
        description="Os convites enviados para sua organização aparecerão aqui."
      >
        <DialogSendInvite />
      </EmptyStateTeamManagement>
    )
  }

  return (
    <Card.Root css={cardSectionCss} variant="outline">
      <ListInvitesSendPage />
    </Card.Root>
  )
}
