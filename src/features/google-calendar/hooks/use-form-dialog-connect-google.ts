import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'

import { googleCalendarMutationOptions } from '../queries/google-calendar.mutation-options'
import { ConnectGoogleCalendarFormSchema } from '../schemas/connect-google-calendar.api.schema'
import type { ConnectGoogleCalendarFormType } from '../types/connectar-google-calendar-api.type'

export function useFormDialogConnectGoogle(
  onOpenDialogConnectGoogle: (open: boolean) => void,
) {
  const {
    mutate: connectGoogleCalendarMutate,
    isPending: isConnectGoogleCalendarPending,
  } = useMutation(googleCalendarMutationOptions.connect())
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ConnectGoogleCalendarFormType>({
    resolver: zodResolver(ConnectGoogleCalendarFormSchema),
    defaultValues: {
      inviteCustomers: false,
    },
  })
  const selectedEstablishmentId = sessionStorage.getItem(
    'selected_establishment_id',
  )

  const handleConnectGoogle = handleSubmit(({ inviteCustomers }) => {
    if (!selectedEstablishmentId) {
      toaster.error({
        title: 'Ops! Nenhum estabelecimento selecionado.',
        description:
          'Por favor, selecione um estabelecimento antes de conectar ao Google Calendar.',
      })
      return
    }

    connectGoogleCalendarMutate(
      {
        calendarId: 'primary',
        establishmentId: selectedEstablishmentId,
        inviteCustomers,
      },
      {
        onSuccess: (data) => {
          toaster.success({
            title: 'Conexão bem-sucedida!',
            description: 'O Google Calendar foi conectado com sucesso.',
          })
          onOpenDialogConnectGoogle(false)
          sessionStorage.removeItem('selected_establishment_id')
          window.location.assign(data.authorizationUrl)
        },
        onError: (error) => {
          toaster.error({
            title: 'Erro ao conectar',
            description:
              error.message ||
              'Ocorreu um erro ao conectar ao Google Calendar.',
          })
        },
      },
    )
  })

  return {
    errors,
    control,
    handleConnectGoogle,
    isConnectGoogleCalendarPending,
  }
}
