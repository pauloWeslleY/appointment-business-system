import { useMutation } from '@tanstack/react-query'

import { toaster } from '@/components/ui/toaster'

import { googleCalendarMutationOptions } from '../queries/google-calendar.mutation-options'

export function useDialogDisconnectGoogle(
  onOpenDialogDisconnectGoogle: (open: boolean) => void,
) {
  const {
    mutate: disconnectGoogleCalendarMutate,
    isPending: isDisconnectGoogleCalendarPending,
  } = useMutation(googleCalendarMutationOptions.disconnect())
  const selectedEstablishmentId = sessionStorage.getItem(
    'selected_establishment_id',
  )

  const handleDisconnectGoogleCalendar = () => {
    if (!selectedEstablishmentId) {
      toaster.error({
        title: 'Ops! Nenhum estabelecimento selecionado.',
        description:
          'Por favor, selecione um estabelecimento antes de desconectar do Google Calendar.',
      })

      return
    }

    disconnectGoogleCalendarMutate(selectedEstablishmentId, {
      onSuccess: () => {
        toaster.success({
          title: 'Desconexão bem-sucedida!',
          description: 'O Google Calendar foi desconectado com sucesso.',
        })

        onOpenDialogDisconnectGoogle(false)
        sessionStorage.removeItem('selected_establishment_id')
      },
      onError: (error) => {
        toaster.error({
          title: 'Erro ao desconectar',
          description:
            error.message ||
            'Ocorreu um erro ao desconectar do Google Calendar.',
        })
      },
    })
  }

  return {
    handleDisconnectGoogleCalendar,
    isDisconnectGoogleCalendarPending,
  }
}
