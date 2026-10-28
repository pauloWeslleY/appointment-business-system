import { useMutation } from '@tanstack/react-query'

import { toaster } from '@/components/ui/toaster'

import { invitationsMutationOptions } from '../queries/invitations.mutation-options'

export function useDialogCancelInvite(onOpen: (open: boolean) => void) {
  const { mutate: cancelInvite, isPending: isCancellingInvite } = useMutation(
    invitationsMutationOptions.cancel(),
  )

  const handleCancelInvite = (inviteId?: string) => {
    if (!inviteId) {
      toaster.error({
        title: 'Ops! ID do convite não encontrado',
        description: 'Por favor, tente novamente mais tarde.',
      })
      return
    }

    cancelInvite(inviteId, {
      onSuccess: (invite) => {
        toaster.success({
          title: 'Convite cancelado',
          description: `O convite de ${invite?.invitation.email ?? 'usuário'} foi cancelado com sucesso.`,
        })
        onOpen(false)
      },
      onError: (error) => {
        toaster.error({
          title: 'Ops! Ocorreu um erro ao cancelar o convite',
          description:
            error.message || 'Por favor, tente novamente mais tarde.',
        })
      },
    })
  }

  return {
    isCancellingInvite,
    handleCancelInvite,
  }
}
