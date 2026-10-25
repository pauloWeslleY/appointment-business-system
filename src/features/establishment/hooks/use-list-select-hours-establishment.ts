import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'

import { establishmentAvailabilityQueryOptions } from '../queries/establishment-query-options'

dayjs.extend(isToday)

interface UseSelectHoursEstablishmentParams {
  establishmentId: string
  serviceId: string
  selectedDay: Date
}

export function useListSelectHoursEstablishment({
  establishmentId,
  serviceId,
  selectedDay,
}: UseSelectHoursEstablishmentParams) {
  const { data: availableHours = [], error: errorAvailableHours } = useQuery(
    establishmentAvailabilityQueryOptions({
      establishmentId,
      serviceId,
      selectedDate: selectedDay.toISOString(),
    }),
  )

  return {
    availableHours,
    errorAvailableHours,
  }
}
