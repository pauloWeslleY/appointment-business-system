import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { useSearch } from '@tanstack/react-router'
import { useMemo } from 'react'
import { type DefaultValues, useForm, useWatch } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'

import { appointmentMutationOptions } from '../queries/appointment-mutation-key'
import { appointmentQueryKeys } from '../queries/appointment-query-key'
import { UpdateStatusAppointmentSchema } from '../schemas/update-status-appointment.schema'
import type { UpdateStatusAppointmentFormType } from '../types/appointment-form.type'
import type { BookingStatusType } from '../types/appointment-status.type'
import type { GetAppointmentByEstablishmentModel } from '../types/get-appointment-by-establishment.model'

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

  const formStatusBooking = useForm<UpdateStatusAppointmentFormType>({
    resolver: zodResolver(UpdateStatusAppointmentSchema),
    defaultValues: formDefaultValues,
  })

  const statusBookingValue = useWatch({
    control: formStatusBooking.control,
    name: 'status',
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

      formStatusBooking.reset({ status: [appointment.status] })
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

  const onChangeSelectStatusBooking = (status: BookingStatusType) => {
    formStatusBooking.setValue('status', [status], {
      shouldValidate: true,
      shouldDirty: true,
    })
  }

  const onSubmitUpdateStatusAppointment = formStatusBooking.handleSubmit(
    (data) => {
      updateStatusAppointment({
        id: appointment.id,
        status: data.status[0],
      })
    },
  )

  return {
    statusBookingValue,
    onChangeSelectStatusBooking,
    onSubmitUpdateStatusAppointment,
    isPendingUpdateStatusAppointment,
  }
}
