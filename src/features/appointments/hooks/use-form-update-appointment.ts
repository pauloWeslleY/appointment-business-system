import { createListCollection } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSearch } from '@tanstack/react-router'
import dayjs from 'dayjs'
import { useMemo } from 'react'
import { type DefaultValues, useForm, useWatch } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'
import { useListSelectHoursEstablishment } from '@/features/establishment/hooks/use-list-select-hours-establishment'

import { appointmentMutationOptions } from '../queries/appointment-mutation-key'
import { appointmentQueryKeys } from '../queries/appointment-query-key'
import { UpdateAppointmentSchema } from '../schemas/update-appointment.schema'
import type { UpdateAppointmentFormType } from '../types/appointment-form.type'
import type { GetAppointmentByEstablishmentModel } from '../types/get-appointment-by-establishment.model'

export function useUpdateAppointmentForm(
  appointment: GetAppointmentByEstablishmentModel,
) {
  const queryClient = useQueryClient()

  const search = useSearch({
    from: '/dashboard/$establishmentId/appointments/',
  })

  const formDefaultValues = useMemo<DefaultValues<UpdateAppointmentFormType>>(
    () => ({
      date: dayjs(appointment.date).format('YYYY-MM-DD'),
      hour: [dayjs(appointment.date).format('HH:mm')],
      notes: appointment.notes ?? null,
    }),
    [appointment],
  )

  const form = useForm<UpdateAppointmentFormType>({
    resolver: zodResolver(UpdateAppointmentSchema),
    defaultValues: formDefaultValues,
  })

  const selectedDate = useWatch({ control: form.control, name: 'date' })

  const selectedHours = useListSelectHoursEstablishment({
    establishmentId: appointment.service.establishmentId,
    serviceId: appointment.service.id,
    selectedDay: new Date(selectedDate),
  })

  const loadSelectTimeAppointment = createListCollection({
    items: selectedHours.availableHours,
  })

  const { mutate: updateAppointment, isPending: isPendingAppointment } =
    useMutation({
      ...appointmentMutationOptions.update(),
      onSuccess: (updateAppointment) => {
        toaster.success({ title: 'Agendamento atualizado com sucesso.' })
        queryClient.setQueryData<GetAppointmentByEstablishmentModel[]>(
          appointmentQueryKeys.establishment({
            establishmentId: appointment.service.establishmentId,
            from: search.from,
            to: search.to,
          }),
          (oldAppointments) => {
            const appointments =
              oldAppointments ?? ([] as GetAppointmentByEstablishmentModel[])

            return appointments.map((appointment) =>
              appointment.id === updateAppointment.id
                ? {
                    ...appointment,
                    date: updateAppointment.date,
                  }
                : appointment,
            )
          },
        )

        const bookingDate = dayjs(updateAppointment.date)
        form.reset({
          date: bookingDate.format('YYYY-MM-DD'),
          hour: [bookingDate.format('HH:mm')],
        })
      },
      onError: (error) => {
        toaster.error({
          title: 'Erro ao atualizar agendamento.',
          description: error.message || 'Ocorreu um erro inesperado.',
        })
      },
    })

  const errors = form.formState.errors
  const loadErrorAvailableHours = selectedHours.errorAvailableHours?.message

  const onSubmitUpdateAppointment = form.handleSubmit((data) => {
    const hour = Number(data.hour[0].split(':')[0])
    const minute = Number(data.hour[0].split(':')[1])
    const dateTime = dayjs(data.date).set('hour', hour).set('minute', minute)

    if (!form.formState.isDirty) {
      toaster.warning({ title: 'Nenhuma alteração foi feita no formulário.' })
      return
    }

    updateAppointment({
      id: appointment.id,
      date: dateTime.toISOString(),
      notes: data.notes ?? null,
    })
  })

  return {
    form,
    errors,
    isPendingAppointment,
    loadErrorAvailableHours,
    loadSelectTimeAppointment,
    onSubmitUpdateAppointment,
  }
}
