import { useMutation, useQueries } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { toaster } from '@/components/ui/toaster'
import { authClient } from '@/lib/auth'
import { cookie } from '@/shared/cache/cookie'

import { invitationsMutationOptions } from '../queries/invitations.mutation-options'
import {
  getInvitationPreviewQueryOptions,
  getInvitationQueryOptions,
} from '../queries/invitations.query-options'
import {
  mapLabelInvitationStatus,
  StatusInvitations,
} from '../types/status-invitations.type'

export function useAcceptInvitation(invitationId?: string) {
  const { data: session } = authClient.useSession()
  const [
    { data: invite, isLoading: isLoadingInvite },
    { data: invitationPreview, isLoading: isLoadingInvitationPreview },
  ] = useQueries({
    queries: [
      getInvitationQueryOptions(invitationId, session?.user?.id),
      getInvitationPreviewQueryOptions(invitationId),
    ],
  })
  const { mutate: acceptInvitation, isPending: isPendingAcceptInvitation } =
    useMutation(invitationsMutationOptions.accept())
  const navigate = useNavigate()
  const mapInvitationStatus = mapLabelInvitationStatus(
    invite?.invitation?.status,
  )
  const showButtonAcceptInvitation =
    invite?.invitation?.status === StatusInvitations.ACCEPTED

  const handleAcceptInvitation = () => {
    if (!invitationId) {
      toaster.error({ title: 'ID do convite não fornecido.' })
      return
    }

    acceptInvitation(invitationId, {
      onSuccess: () => {
        toaster.success({ title: 'Convite aceito com sucesso.' })
        cookie.delete('redirectTo')
        navigate({ to: '/establishment' })
      },
      onError: (error) => {
        toaster.error({
          title: 'Erro ao aceitar o convite.',
          description: error.message || 'Ocorreu um erro inesperado.',
        })
      },
    })
  }

  return {
    invite,
    invitationPreview,
    isLoadingInvite,
    isLoadingInvitationPreview,
    isPendingAcceptInvitation,
    showButtonAcceptInvitation,
    mapInvitationStatus,
    handleAcceptInvitation,
  }
}
