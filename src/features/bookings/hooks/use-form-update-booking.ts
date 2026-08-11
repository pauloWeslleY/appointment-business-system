import { createListCollection } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSearch } from '@tanstack/react-router'
import dayjs from 'dayjs'
import { useMemo } from 'react'
import { type DefaultValues, useForm, useWatch } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'
import { useListSelectHoursEstablishment } from '@/features/establishment/hooks/use-list-select-hours-establishment'

import { bookingMutationOptions } from '../queries/booking-mutation-key'
import { bookingQueryKeys } from '../queries/booking-query-key'
import { UpdateBookingSchema } from '../schemas/update-booking.schema'
import type { UpdateBookingFormType } from '../types/booking-form.type'
import type { GetBookingByEstablishmentModel } from '../types/get-booking-by-establishment.model'

export function useUpdateBookingForm(booking: GetBookingByEstablishmentModel) {
  const queryClient = useQueryClient()
  const search = useSearch({ from: '/dashboard/$slug/bookings/' })

  const formDefaultValues = useMemo<DefaultValues<UpdateBookingFormType>>(
    () => ({
      date: dayjs(booking.date).format('YYYY-MM-DD'),
      hour: [dayjs(booking.date).format('HH:mm')],
      notes: booking.notes ?? null,
    }),
    [booking],
  )

  const form = useForm<UpdateBookingFormType>({
    resolver: zodResolver(UpdateBookingSchema),
    defaultValues: formDefaultValues,
  })

  const selectedDate = useWatch({ control: form.control, name: 'date' })

  const selectedTime = useListSelectHoursEstablishment({
    establishmentId: booking.service.establishmentId,
    serviceId: booking.service.id,
    selectedDay: new Date(selectedDate),
  })

  const loadSelectTimeBooking = createListCollection({
    items: selectedTime.availableHours,
  })

  const { mutate: updateBooking, isPending: isPendingBooking } = useMutation({
    ...bookingMutationOptions.update(),
    onSuccess: (updateBooking, variables) => {
      queryClient.setQueryData<GetBookingByEstablishmentModel[]>(
        bookingQueryKeys.establishment({
          establishmentId: booking.service.establishmentId,
          from: search.from,
          to: search.to,
        }),
        (oldBookings) => {
          return (oldBookings ?? ([] as GetBookingByEstablishmentModel[])).map(
            (booking) =>
              booking.id === variables.id
                ? {
                    ...booking,
                    date: updateBooking.date,
                  }
                : booking,
          )
        },
      )

      const bookingDate = dayjs(updateBooking.date)
      form.reset({
        date: bookingDate.format('YYYY-MM-DD'),
        hour: [bookingDate.format('HH:mm')],
      })
      toaster.success({ title: 'Agendamento atualizado com sucesso.' })
    },
    onError: (error) => {
      toaster.error({
        title: 'Erro ao atualizar agendamento.',
        description: error.message || 'Ocorreu um erro inesperado.',
      })
    },
  })

  const errors = form.formState.errors

  const onSubmitUpdateBooking = form.handleSubmit((data) => {
    const hour = Number(data.hour[0].split(':')[0])
    const minute = Number(data.hour[0].split(':')[1])
    const dateTime = dayjs(data.date).set('hour', hour).set('minute', minute)

    if (!form.formState.isDirty) {
      toaster.warning({ title: 'Nenhuma alteração foi feita no formulário.' })
      return
    }

    updateBooking({
      id: booking.id,
      date: dateTime.toISOString(),
      notes: data.notes || null,
    })
  })

  return {
    form,
    errors,
    isPendingBooking,
    loadSelectTimeBooking,
    onSubmitUpdateBooking,
  }
}
