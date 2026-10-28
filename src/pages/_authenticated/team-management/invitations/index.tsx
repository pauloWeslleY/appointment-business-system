import { Card } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import { getRouteApi } from '@tanstack/react-router'
import { MailOpen } from 'lucide-react'
import z from 'zod'

import EmptyStateTeamManagement from '@/components/empty-state-team-management'
import DialogSendInvite from '@/features/invitations/components/dialog-send-invite'
import ListInvitesSendPage from '@/features/invitations/pages/list-invites-send'
import { cardSectionCss } from '@/theme/styles/global-styles'

export const Route = createFileRoute(
  '/_authenticated/team-management/invitations/',
)({
  validateSearch: z.object({
    q: z.string().optional(),
  }),
  component: InvitationPage,
})

const routeTeamManagement = getRouteApi('/_authenticated/team-management')

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
