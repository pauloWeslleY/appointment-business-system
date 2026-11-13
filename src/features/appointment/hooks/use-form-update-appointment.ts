import { createListCollection } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useForm, useWatch } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'
import { useAppSession } from '@/features/authentication/hooks/use-app-session'
import { establishmentAvailabilityQueryOptions } from '@/features/establishment/queries/establishment.query-options'

import {
  appointmentDateTime,
  appointmentLocalDate,
} from '../helpers/appointment-date'
import { appointmentMutationOptions } from '../queries/appointment.mutation-options'
import { UpdateAppointmentSchema } from '../schemas/update-appointment-form.schema'
import type { AppointmentModel } from '../types/appointment.model'
import type { UpdateAppointmentFormType } from '../types/appointment-form.type'

export function useUpdateAppointmentForm(appointment: AppointmentModel) {
  const { data: session } = useAppSession()
  const localDate = appointmentLocalDate(
    appointment.startsAt,
    appointment.timezone,
  )

  const form = useForm<UpdateAppointmentFormType>({
    resolver: zodResolver(UpdateAppointmentSchema),
    values: {
      date: localDate.format('YYYY-MM-DD'),
      hour: [localDate.format('HH:mm')],
      notes: appointment.notes,
    },
  })
  const { isDirty: hasAppointmentChanges } = form.formState

  const date = useWatch({
    control: form.control,
    name: 'date',
  })

  const validadeDate = /^\d{4}-\d{2}-\d{2}$/.test(date) && dayjs(date).isValid()
  const selectedDate = validadeDate
    ? appointmentDateTime(date, '00:00', appointment.timezone)
    : ''

  const {
    data: selectedTime,
    error: errorAvailableHours,
    isLoading: isLoadingAvailableHours,
  } = useQuery(
    establishmentAvailabilityQueryOptions({
      establishmentId: appointment.establishmentId,
      serviceId: appointment.serviceId,
      selectedDate,
    }),
  )

  const mutationOptions = appointmentMutationOptions.update()
  const { mutate: updateAppointment, isPending: isPendingUpdateAppointment } =
    useMutation({
      ...mutationOptions,
      onSuccess: async (...args) => {
        await mutationOptions.onSuccess?.(...args)
        toaster.success({ title: 'Agendamento atualizado com sucesso.' })
      },
      onError: (error) => {
        toaster.error({
          title: 'Erro ao atualizar agendamento.',
          description: error.message,
        })
      },
    })

  const onSubmitUpdateAppointment = form.handleSubmit((data) => {
    if (isPendingUpdateAppointment) {
      return
    }

    if (session?.session.activeOrganizationId !== appointment.organizationId) {
      toaster.error({
        title: 'A organização foi alterada. Reabra o agendamento.',
      })

      return
    }

    if (!hasAppointmentChanges) {
      toaster.warning({ title: 'Nenhuma alteração foi feita no formulário.' })
      return
    }

    updateAppointment({
      id: appointment.id,
      establishmentId: appointment.establishmentId,
      organizationId: appointment.organizationId,
      date: appointmentDateTime(data.date, data.hour[0], appointment.timezone),
      notes: data.notes || null,
    })
  })

  const errors = form.formState.errors
  const isPendingAppointment = isPendingUpdateAppointment
  const loadSelectTimeAppointment = createListCollection({
    items: selectedTime ?? [],
  })

  return {
    form,
    errors,
    isPendingAppointment,
    loadSelectTimeAppointment,
    onSubmitUpdateAppointment,
    errorAvailableHours,
    isLoadingAvailableHours,
  }
}
