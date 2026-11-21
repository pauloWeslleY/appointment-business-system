import { formatCurrencyInCents } from '@/shared/utils/formatted-price'

import type { ListServicesEstablishmentModel } from '../types/list-services-establishment.model'
import { formattedDurationInMinutesService } from '../utils/formatted-duration-in-minutes-service'

export function useServiceEstablishmentTableRow(
  service: ListServicesEstablishmentModel,
) {
  const servicePriceLabel = formatCurrencyInCents(service.servicePriceInCents)
  const serviceDurationLabel = formattedDurationInMinutesService(
    service.durationInMinutes ?? 0,
  )

  const serviceAppointmentsLabel =
    service.totalAppointments === 1
      ? '1 agendamento'
      : `${service.totalAppointments} agendamentos`

  return {
    servicePriceLabel,
    serviceDurationLabel,
    serviceAppointmentsLabel,
  }
}
