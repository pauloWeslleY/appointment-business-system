import { useQuery } from '@tanstack/react-query'
import { useSearch } from '@tanstack/react-router'
import { useMemo, useState } from 'react'

import { authClient } from '@/lib/auth'

import { listInvitationsQueryOptions } from '../queries/invitations.query-options'
import type { InviteProps } from '../types/invitation.model.api'

export function useInvitationNavigation() {
  const [openDialogCancelInvite, setOpenDialogCancelInvite] = useState(false)
  const [selectedInvitation, setSelectedInvitation] =
    useState<InviteProps | null>(null)

  const { q } = useSearch({
    from: '/_authenticated/team-management/invitations/',
  })
  const { data: session } = authClient.useSession()
  const { data: invitations, isLoading: isLoadingInvitations } = useQuery(
    listInvitationsQueryOptions(
      session?.user?.id,
      session?.session?.activeOrganizationId ?? undefined,
    ),
  )

  const loadListInvitations = useMemo(() => {
    const filteredInvitations = (invitations?.invitations ?? []).filter(
      (invite) => !q || invite.email.includes(q),
    )

    const expiresAt = (invite: InviteProps) =>
      new Date(invite.expiresAt).getTime()

    return [...filteredInvitations].sort((a, b) => expiresAt(b) - expiresAt(a))
  }, [invitations, q])

  const handleOpenDialogCancelInvite = (invite: InviteProps) => {
    setSelectedInvitation(invite)
    setOpenDialogCancelInvite(true)
  }

  return {
    openDialogCancelInvite,
    setOpenDialogCancelInvite,
    selectedInvitation,
    isLoadingInvitations,
    loadListInvitations,
    handleOpenDialogCancelInvite,
  }
}
