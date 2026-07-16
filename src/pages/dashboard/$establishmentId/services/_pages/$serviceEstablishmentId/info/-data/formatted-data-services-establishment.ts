import type { ServiceEstablishmentDetailsModel } from '@/shared/services/service-establishment/service-establishment.dto'
import { formattedDateAndHours } from '@/utils/formatted-date'
import { formatCurrencyInCents } from '@/utils/formatted-price'

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
