import { createListCollection } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useForm, useWatch } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'
import { useAppSession } from '@/features/authentication/hooks/use-app-session'
import { establishmentAvailabilityQueryOptions } from '@/features/establishment/queries/establishment.query-options'

import { appointmentMutationOptions } from '../queries/appointment.mutation-options'
import { UpdateAppointmentSchema } from '../schemas/update-appointment-form.schema'
import type { AppointmentModel } from '../types/appointment.model'
import type { UpdateAppointmentFormType } from '../types/appointment-form.type'
import {
  appointmentDateTime,
  appointmentLocalDate,
} from '../utils/appointment-date'

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

  const date = useWatch({ control: form.control, name: 'date' })
  const selectedDate =
    /^\d{4}-\d{2}-\d{2}$/.test(date) && dayjs(date).isValid()
      ? appointmentDateTime(date, '00:00', appointment.timezone)
      : ''
  const selectedTime = useQuery(
    establishmentAvailabilityQueryOptions({
      establishmentId: appointment.establishmentId,
      serviceId: appointment.serviceId,
      selectedDate,
    }),
  )

  const mutationOptions = appointmentMutationOptions.update()
  const mutation = useMutation({
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
    if (mutation.isPending) {
      return
    }

    if (session?.session.activeOrganizationId !== appointment.organizationId) {
      toaster.error({
        title: 'A organização foi alterada. Reabra o agendamento.',
      })

      return
    }

    if (!form.formState.isDirty) {
      toaster.warning({ title: 'Nenhuma alteração foi feita no formulário.' })
      return
    }

    mutation.mutate({
      id: appointment.id,
      establishmentId: appointment.establishmentId,
      organizationId: appointment.organizationId,
      date: appointmentDateTime(data.date, data.hour[0], appointment.timezone),
      notes: data.notes || null,
    })
  })

  return {
    form,
    errors: form.formState.errors,
    isPendingAppointment: mutation.isPending,
    loadSelectTimeAppointment: createListCollection({
      items: selectedTime.data ?? [],
    }),
    onSubmitUpdateAppointment,
    errorAvailableHours: selectedTime.error,
    isLoadingAvailableHours: selectedTime.isFetching,
  }
}
