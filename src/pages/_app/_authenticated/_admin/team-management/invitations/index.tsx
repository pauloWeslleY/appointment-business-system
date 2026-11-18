import { createFileRoute, getRouteApi } from '@tanstack/react-router'
import { MailOpen } from 'lucide-react'
import z from 'zod'

import EmptyStateTeamManagement from '@/components/empty-state-team-management'
import DialogSendInvite from '@/features/invitations/components/dialog-send-invite'
import ListInvitesSendPage from '@/features/invitations/pages/list-invites-send'
import { PERMISSION_ACTIONS, RESOURCES } from '@/shared/constants/permission'
import { validateRoutePermission } from '@/shared/validations/validate-route-permission'

export const Route = createFileRoute(
  '/_app/_authenticated/_admin/team-management/invitations/',
)({
  validateSearch: z.object({
    q: z.string().optional(),
  }),
  beforeLoad: ({ context }) =>
    validateRoutePermission(context.memberContext, {
      resource: RESOURCES.INVITATION,
      action: PERMISSION_ACTIONS.CREATE,
    }),
  component: InvitationPage,
  head: () => ({
    meta: [
      {
        title: 'Convites | Agendros',
      },
    ],
  }),
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

  return <ListInvitesSendPage />
}
