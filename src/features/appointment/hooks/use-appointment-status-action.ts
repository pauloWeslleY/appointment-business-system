import { useMutation } from '@tanstack/react-query'

import { toaster } from '@/components/ui/toaster'
import { useAppSession } from '@/features/authentication/hooks/use-app-session'

import { appointmentMutationOptions } from '../queries/appointment.mutation-options'
import {
  AppointmentStatus,
  type AppointmentStatusType,
} from '../types/appointment-status.type'
import type { GetAppointmentByEstablishmentModel } from '../types/get-appointment-by-establishment.model'

interface AppointmentStatusAction {
  nextStatus: AppointmentStatusType
  label: string
  successMessage: string
}

export function useAppointmentStatusAction(
  appointment: GetAppointmentByEstablishmentModel,
) {
  const { data: session } = useAppSession()

  const appointmentStatusActionByStatus: Partial<
    Record<AppointmentStatusType, AppointmentStatusAction>
  > = {
    [AppointmentStatus.PENDING]: {
      nextStatus: AppointmentStatus.CONFIRMED,
      label: 'Confirmar',
      successMessage: 'Agendamento confirmado.',
    },
    [AppointmentStatus.CONFIRMED]: {
      nextStatus: AppointmentStatus.CONCLUDED,
      label: 'Concluir',
      successMessage: 'Agendamento concluído.',
    },
  }
  const appointmentStatusAction =
    appointmentStatusActionByStatus[appointment.status]

  const {
    isPending: isUpdatingAppointmentStatus,
    mutate: updateAppointmentStatus,
  } = useMutation({
    ...appointmentMutationOptions.status(),
    onSuccess: async (...mutationResult) => {
      await appointmentMutationOptions.status().onSuccess?.(...mutationResult)
      toaster.success({
        title: appointmentStatusAction?.successMessage,
      })
    },
    onError: (updateAppointmentStatusError) => {
      toaster.error({
        title: 'Erro ao atualizar status.',
        description: updateAppointmentStatusError.message,
      })
    },
  })

  const applyAppointmentStatusAction = (): void => {
    if (!appointmentStatusAction) {
      return
    }

    const isAppointmentFromActiveOrganization =
      session?.session.activeOrganizationId === appointment.organizationId

    if (!isAppointmentFromActiveOrganization) {
      toaster.error({
        title: 'A organização foi alterada. Recarregue os agendamentos.',
      })
      return
    }

    updateAppointmentStatus({
      id: appointment.id,
      establishmentId: appointment.establishmentId,
      status: appointmentStatusAction.nextStatus,
    })
  }

  return {
    appointmentStatusAction,
    isUpdatingAppointmentStatus,
    applyAppointmentStatusAction,
  }
}
