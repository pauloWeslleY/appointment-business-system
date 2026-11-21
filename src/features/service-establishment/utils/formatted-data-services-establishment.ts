import { formattedDateAndHours } from '@/shared/utils/formatted-date'
import { formatCurrencyInCents } from '@/shared/utils/formatted-price'

import type { ServiceEstablishmentDetailsModel } from '../types/service-establishment-details.model'
import { formattedDurationInMinutesService } from './formatted-duration-in-minutes-service'

interface FormattedServiceEstablishmentInfoProps {
  label: string
  content: string
  fullWidth?: boolean
}

const WITHOUT_DATA = 'N/A' as const

export const formattedDataServiceEstablishmentDetails = (
  service?: ServiceEstablishmentDetailsModel,
): FormattedServiceEstablishmentInfoProps[] => [
  {
    label: 'Nome',
    content: service?.name ?? WITHOUT_DATA,
  },
  {
    label: 'Duração',
    content: formattedDurationInMinutesService(service?.durationInMinutes ?? 0),
  },
  {
    label: 'Preço de serviço',
    content: formatCurrencyInCents(service?.servicePriceInCents ?? 0),
  },
  {
    label: 'Descrição',
    content: service?.description ?? WITHOUT_DATA,
    fullWidth: true,
  },
  {
    label: 'Criado em',
    content: formattedDateAndHours(service?.createdAt ?? null, true),
  },
  {
    label: 'Atualizado em',
    content: formattedDateAndHours(service?.updatedAt ?? null, true),
  },
]
