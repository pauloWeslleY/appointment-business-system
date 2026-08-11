import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSearch } from '@tanstack/react-router'
import { getRouteApi } from '@tanstack/react-router'
import { useMemo } from 'react'
import { type DefaultValues, useForm, useWatch } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'

import { bookingMutationOptions } from '../queries/booking-mutation-key'
import { bookingQueryKeys } from '../queries/booking-query-key'
import { UpdateStatusBookingSchema } from '../schemas/update-status-booking.schema'
import type { UpdateStatusBookingFormType } from '../types/booking-form.type'
import type { BookingStatusType } from '../types/booking-status.type'
import type { GetBookingByEstablishmentModel } from '../types/get-booking-by-establishment.model'

const dashboardSlugRoute = getRouteApi('/dashboard/$slug')

export function useUpdateStatusBookingForm(
  booking: GetBookingByEstablishmentModel,
) {
  const establishment = dashboardSlugRoute.useLoaderData()
  const { from, to } = useSearch({ from: '/dashboard/$slug/bookings/' })
  const queryClient = useQueryClient()

  const formDefaultValues = useMemo<DefaultValues<UpdateStatusBookingFormType>>(
    () => ({ status: [booking.status] }),
    [booking],
  )

  const formStatusBooking = useForm<UpdateStatusBookingFormType>({
    resolver: zodResolver(UpdateStatusBookingSchema),
    defaultValues: formDefaultValues,
  })

  const statusBookingValue = useWatch({
    control: formStatusBooking.control,
    name: 'status',
  })

  const {
    mutate: updateStatusBooking,
    isPending: isPendingUpdateStatusBooking,
  } = useMutation({
    ...bookingMutationOptions.status(),
    onSuccess: (booking) => {
      queryClient.setQueryData<GetBookingByEstablishmentModel[]>(
        bookingQueryKeys.establishment({
          establishmentId: establishment.id,
          from,
          to,
        }),
        (oldBookings) => {
          return (
            oldBookings ??
            ([] as GetBookingByEstablishmentModel[]).map((oldBooking) =>
              oldBooking.id === booking.id
                ? {
                    ...oldBooking,
                    status: booking.status,
                  }
                : oldBooking,
            )
          )
        },
      )

      formStatusBooking.reset({ status: [booking.status] })
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

  const onSubmitUpdateStatusBooking = formStatusBooking.handleSubmit((data) => {
    if (!formStatusBooking.formState.isDirty) {
      toaster.error({
        title: 'Nenhuma alteração foi feita!',
        description: 'Por favor, selecione um novo status para atualizar.',
      })
      return
    }

    updateStatusBooking({
      id: booking.id,
      status: data.status[0],
    })
  })

  return {
    statusBookingValue,
    onChangeSelectStatusBooking,
    onSubmitUpdateStatusBooking,
    isPendingUpdateStatusBooking,
  }
}
