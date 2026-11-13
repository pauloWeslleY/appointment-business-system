import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm, useWatch } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'
import { useAppSession } from '@/features/authentication/hooks/use-app-session'

import { appointmentMutationOptions } from '../queries/appointment.mutation-options'
import { UpdateStatusAppointmentSchema } from '../schemas/update-status-appointment-form.schema'
import type { AppointmentModel } from '../types/appointment.model'
import type { UpdateStatusAppointmentFormType } from '../types/appointment-form.type'
import { AppointmentStatusSchema } from '../types/appointment-status.type'

export function useUpdateStatusAppointmentForm(appointment: AppointmentModel) {
  const { data: session } = useAppSession()
  const form = useForm<UpdateStatusAppointmentFormType>({
    resolver: zodResolver(UpdateStatusAppointmentSchema),
    values: { status: [appointment.status], cancellationReason: '' },
  })
  const { isDirty: hasAppointmentStatusChanges } = form.formState

  const statusAppointmentValue = useWatch({
    control: form.control,
    name: 'status',
  })

  const mutationOptions = appointmentMutationOptions.status()
  const mutation = useMutation({
    ...mutationOptions,
    onSuccess: async (...args) => {
      await mutationOptions.onSuccess?.(...args)
      toaster.success({ title: 'Status atualizado com sucesso.' })
    },
    onError: (error) => {
      toaster.error({
        title: 'Erro ao atualizar status.',
        description: error.message,
      })
    },
  })

  const onChangeSelectStatusAppointment = (value: string | null) => {
    const result = AppointmentStatusSchema.safeParse(value)
    if (result.success) {
      form.setValue('status', [result.data], {
        shouldDirty: true,
        shouldValidate: true,
      })
    }
  }

  const onSubmitUpdateStatusAppointment = form.handleSubmit((data) => {
    if (mutation.isPending) {
      return
    }

    if (session?.session.activeOrganizationId !== appointment.organizationId) {
      toaster.error({
        title: 'A organização foi alterada. Reabra o agendamento.',
      })

      return
    }

    if (!hasAppointmentStatusChanges) {
      toaster.warning({ title: 'Nenhuma alteração foi feita.' })
      return
    }

    mutation.mutate({
      id: appointment.id,
      establishmentId: appointment.establishmentId,
      status: data.status[0],
      ...(data.status[0] === 'cancelled'
        ? {
            serviceId: appointment.serviceId,
            cancellationReason: data.cancellationReason.trim(),
          }
        : {}),
    })
  })

  return {
    statusAppointmentValue,
    onChangeSelectStatusAppointment,
    onSubmitUpdateStatusAppointment,
    isPendingUpdateStatusAppointment: mutation.isPending,
    form,
  }
}
