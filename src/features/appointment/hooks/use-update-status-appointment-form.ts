import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm, useWatch } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'
import { useAppSession } from '@/features/authentication/hooks/use-app-session'

import {
  optionsStatusAppointmentConcludedCancelled,
  optionsStatusAppointmentConfirmedCancelled,
  statusAppointmentCancelled,
} from '../constants/options-status-appointment'
import { appointmentMutationOptions } from '../queries/appointment.mutation-options'
import { UpdateStatusAppointmentSchema } from '../schemas/update-status-appointment-form.schema'
import type { AppointmentModel } from '../types/appointment.model'
import type { UpdateStatusAppointmentFormType } from '../types/appointment-form.type'
import {
  AppointmentStatus,
  AppointmentStatusSchema,
  appointmentStatusUpdateErrorTitle,
} from '../types/appointment-status.type'
import { loadSelectStatusAppointment } from '../utils/select-appointment'

export function useUpdateStatusAppointmentForm(appointment: AppointmentModel) {
  const { data: session } = useAppSession()
  const {
    control,
    setValue,
    register,
    handleSubmit,
    formState: { errors, isDirty: hasAppointmentStatusChanges },
  } = useForm<UpdateStatusAppointmentFormType>({
    resolver: zodResolver(UpdateStatusAppointmentSchema),
    values: { status: [appointment.status], cancellationReason: '' },
  })

  const {
    isPending: isPendingUpdateStatusAppointment,
    mutate: updateStatusAppointment,
  } = useMutation({
    ...appointmentMutationOptions.status(),
    onSuccess: async (...args) => {
      await appointmentMutationOptions.status().onSuccess?.(...args)
      toaster.success({ title: 'Status atualizado com sucesso.' })
    },
    onError: (updateStatusAppointmentError, updateStatusAppointmentRequest) => {
      toaster.error({
        title:
          appointmentStatusUpdateErrorTitle[
            updateStatusAppointmentRequest.status
          ],
        description: updateStatusAppointmentError.message,
      })
    },
  })

  const statusAppointmentValue = useWatch({ control, name: 'status' })
  const showInputCancellationReason = statusAppointmentCancelled.has(
    statusAppointmentValue[0],
  )
  const disabledUpdateStatusCancelled = statusAppointmentCancelled.has(
    appointment.status,
  )

  const loadRadioOptionsStatusAppointment = loadSelectStatusAppointment.filter(
    ({ value: optionStatus }) => {
      if (optionStatus === appointment.status) {
        return true
      }

      if (appointment.status === AppointmentStatus.PENDING) {
        return optionsStatusAppointmentConfirmedCancelled.has(optionStatus)
      }

      if (appointment.status === AppointmentStatus.CONFIRMED) {
        return optionsStatusAppointmentConcludedCancelled.has(optionStatus)
      }

      return false
    },
  )

  const onChangeSelectStatusAppointment = (value: string | null) => {
    const result = AppointmentStatusSchema.safeParse(value)
    if (result.success) {
      setValue('status', [result.data], {
        shouldDirty: true,
        shouldValidate: true,
      })
    }
  }

  const onSubmitUpdateStatusAppointment = handleSubmit((data) => {
    if (session?.session.activeOrganizationId !== appointment.organizationId) {
      toaster.error({
        title: 'Você trocou de organização.',
        description:
          'Este agendamento é de outra organização. Reabra a lista para alterar os agendamentos da organização atual.',
      })
      return
    }

    if (!hasAppointmentStatusChanges) {
      toaster.warning({
        title: 'Nenhuma alteração foi feita.',
        description: 'Escolha um status diferente do atual para salvar.',
      })
      return
    }

    updateStatusAppointment({
      id: appointment.id,
      establishmentId: appointment.establishmentId,
      status: data.status[0],
      ...(data.status[0] === AppointmentStatus.CANCELLED && {
        serviceId: appointment.serviceId,
        cancellationReason: data.cancellationReason.trim(),
      }),
    })
  })

  return {
    errors,
    register,
    statusAppointmentValue,
    showInputCancellationReason,
    isPendingUpdateStatusAppointment,
    disabledUpdateStatusCancelled,
    loadRadioOptionsStatusAppointment,
    onChangeSelectStatusAppointment,
    onSubmitUpdateStatusAppointment,
  }
}
