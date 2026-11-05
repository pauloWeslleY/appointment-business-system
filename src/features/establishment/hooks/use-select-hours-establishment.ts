import { useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import { useMemo } from 'react'

import { useGetAppointmentByService } from '@/features/appointment/hooks/use-get-list-appointment-by-services'
import type { OpeningHoursDayProps } from '@/shared/types/opening-hours.type'
import { generateDayTimeList } from '@/shared/utils/generate-time-list'

import { establishmentQueryKeys } from '../queries/establishment.query-key'
import type { EstablishmentOrganizationProfileApiResponse } from '../types/get-establishment-api.response.type'

dayjs.extend(isToday)

interface UseSelectHoursEstablishmentParams {
  establishmentId: string
  serviceId: string
  selectedDay: Date
}

export function useSelectHoursEstablishment({
  establishmentId,
  serviceId,
  selectedDay,
}: UseSelectHoursEstablishmentParams) {
  const queryClient = useQueryClient()

  const loadEstablishment =
    queryClient.getQueryData<EstablishmentOrganizationProfileApiResponse>(
      establishmentQueryKeys.detail(establishmentId),
    )

  const { data: bookingsByService } = useGetAppointmentByService({
    establishmentId,
    serviceId,
    date: selectedDay.toISOString(),
  })

  const loadOpeningHours = useMemo(() => {
    const dayCurrency = new Date()

    const getOpeningHours = (opening: OpeningHoursDayProps) => {
      return opening.intervals.map(
        (interval) => `${interval.open} - ${interval.close}`,
      )
    }

    const selectedHours =
      loadEstablishment?.openingHours.map(getOpeningHours).flat() || []

    return selectedHours[dayCurrency.getDay()] || '00:00 - 00:00'
  }, [loadEstablishment?.openingHours])

  const getTimeList = useMemo(() => {
    if (!selectedDay) {
      return []
    }

    const time = generateDayTimeList({
      date: selectedDay,
      interval: 30,
      hours: loadOpeningHours,
    })

    const loadSelectHours = time.filter((time) => {
      const hour = parseInt(time.split(':')[0])
      const minutes = parseInt(time.split(':')[1])

      const hasTimeIsPast = dayjs(new Date())
        .set('hour', hour)
        .set('minute', minutes)
        .set('second', 0)
        .set('millisecond', 0)

      const hasDateSelected = dayjs(selectedDay)
        .set('hour', hour)
        .set('minute', minutes)
        .set('second', 0)
        .set('millisecond', 0)

      const hasDateIsPast = dayjs(hasDateSelected).isSameOrBefore()
      const hasTimePast = dayjs(hasTimeIsPast).isBefore()
      const hasCurrentDate = dayjs(selectedDay).isToday()

      if (hasDateIsPast) {
        return false
      }

      if (hasTimePast && hasCurrentDate) {
        return false
      }

      const listBookings = (bookingsByService ?? []).map((appointment) => ({
        ...appointment,
        date: new Date(appointment.startsAt),
      }))

      const hasHourAvailable = listBookings.some(
        (appointment) =>
          appointment.date.getHours() === hour &&
          appointment.date.getMinutes() === minutes,
      )

      if (hasHourAvailable) {
        return false
      }

      return true
    })

    return loadSelectHours.map((time) => ({
      label: time,
      value: time,
    }))
  }, [bookingsByService, selectedDay, loadOpeningHours])

  return getTimeList
}
