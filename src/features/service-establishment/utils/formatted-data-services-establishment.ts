import { formattedDateAndHours } from '@/shared/utils/formatted-date'
import { formatCurrencyInCents } from '@/shared/utils/formatted-price'

import type { ServiceEstablishmentDetailsModel } from '../types/service-esatablishment-details.model'

const WITHOUT_DATA = 'Sem dados' as const

export const formattedDataServiceEstablishmentDetails = (
  service?: ServiceEstablishmentDetailsModel,
) => [
  {
    label: 'Nome',
    content: service?.name ?? WITHOUT_DATA,
  },
  {
    label: 'Descrição',
    content: service?.description ?? WITHOUT_DATA,
  },
  {
    label: 'Preço de serviço',
    content: formatCurrencyInCents(service?.servicePriceInCents ?? 0),
  },
  {
    label: 'Total de agendamentos',
    content: String(
      service?.bookings?.length !== 0 ? service?.bookings.length : 0,
    ),
  },
  {
    label: 'Criado em',
    content: service?.createdAt
      ? formattedDateAndHours(service.createdAt, true)
      : WITHOUT_DATA,
  },
  {
    label: 'Atualizado em',
    content: service?.updatedAt
      ? formattedDateAndHours(service.updatedAt, true)
      : WITHOUT_DATA,
  },
]
