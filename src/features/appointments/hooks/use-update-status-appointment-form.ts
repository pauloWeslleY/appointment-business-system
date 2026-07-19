import { createListCollection } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { useSearch } from '@tanstack/react-router'
import { useMemo } from 'react'
import { type DefaultValues, useForm } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'

import { appointmentMutationOptions } from '../queries/appointment-mutation-key'
import { appointmentQueryKeys } from '../queries/appointment-query-key'
import { UpdateStatusAppointmentSchema } from '../schemas/update-status-appointment.schema'
import type { UpdateStatusAppointmentFormType } from '../types/appointment-form.type'
import {
  AppointmentStatus,
  appointmentStatusLabel,
} from '../types/appointment-status.type'
import type { GetAppointmentByEstablishmentModel } from '../types/get-appointment-by-establishment.model'

const loadSelectStatusBookings = createListCollection({
  items: [
    {
      label: appointmentStatusLabel[AppointmentStatus.CONFIRMED],
      value: AppointmentStatus.CONFIRMED,
    },
    {
      label: appointmentStatusLabel[AppointmentStatus.CANCELLED],
      value: AppointmentStatus.CANCELLED,
    },
    {
      label: appointmentStatusLabel[AppointmentStatus.COMPLETED],
      value: AppointmentStatus.COMPLETED,
    },
  ],
})

export function useUpdateStatusAppointmentForm(
  appointment: GetAppointmentByEstablishmentModel,
) {
  const { establishmentId } = useParams({
    from: '/dashboard/$establishmentId/appointments/',
  })

  const { from, to } = useSearch({
    from: '/dashboard/$establishmentId/appointments/',
  })

  const queryClient = useQueryClient()

  const formDefaultValues = useMemo<
    DefaultValues<UpdateStatusAppointmentFormType>
  >(() => ({ status: [appointment.status] }), [appointment])

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateStatusAppointmentFormType>({
    resolver: zodResolver(UpdateStatusAppointmentSchema),
    defaultValues: formDefaultValues,
  })

  const {
    mutate: updateStatusAppointment,
    isPending: isPendingUpdateStatusAppointment,
  } = useMutation({
    ...appointmentMutationOptions.status(),
    onSuccess: (appointment) => {
      queryClient.setQueryData<GetAppointmentByEstablishmentModel[]>(
        appointmentQueryKeys.establishment({ establishmentId, from, to }),
        (oldAppointments) => {
          const appointments =
            oldAppointments ?? ([] as GetAppointmentByEstablishmentModel[])

          return appointments.map((oldAppointment) =>
            oldAppointment.id === appointment.id
              ? {
                  ...oldAppointment,
                  status: appointment.status,
                }
              : oldAppointment,
          )
        },
      )

      reset({ status: [appointment.status] })
      toaster.success({
        title: 'Status do agendamento atualizado com sucesso!',
      })
    },
    onError: (error) => {
      toaster.error({
        title: 'Falha ao atualizar status do agendamento!',
        description:
          error.message ||
          'Ocorreu um erro ao atualizar o status do agendamento.',
      })
    },
  })

  const onSubmitUpdateStatusAppointment = (
    data: UpdateStatusAppointmentFormType,
  ) => {
    updateStatusAppointment({
      id: appointment.id,
      status: data.status[0],
    })
  }

  return {
    errors,
    control,
    handleSubmit,
    onSubmitUpdateStatusAppointment,
    loadSelectStatusBookings,
    isPendingUpdateStatusAppointment,
  }
}
