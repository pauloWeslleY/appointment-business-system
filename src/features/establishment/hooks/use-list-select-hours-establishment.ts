import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'

import { establishmentQueryKeys } from '../queries/establishment-query-key'
import { getListOpeningHoursEstablishmentService } from '../services/establishment.service'

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
  const { data: availableHours = [], error: errorAvailableHours } = useQuery({
    queryKey: establishmentQueryKeys.listSelectHours({
      establishmentId,
      serviceId,
      selectedDay,
    }),
    queryFn: () => {
      return getListOpeningHoursEstablishmentService({
        establishmentId,
        serviceId,
        selectedDate: selectedDay.toISOString(),
      })
    },
  })

  return {
    availableHours,
    errorAvailableHours,
  }
}
