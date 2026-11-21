import { type LucideIcon, MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react'

import { useStorageImage } from '@/shared/hooks/use-get-storage-image'
import { weekDaysLabels } from '@/shared/utils/create-list-weekdays'
import { formattedPhone, formattedZipCode } from '@/shared/utils/formatted-mask'

import { openingHoursEstablishmentMapper } from '../helpers/opening-hours-establishment-mapper'
import { mapStatusEstablishment } from '../types/establishment-status.type'
import type { EstablishmentOrganizationProfileApiResponse } from '../types/get-establishment-api.response.type'
import { getEstablishmentStorageImageKey } from '../utils/establishment-storage-image'
import {
  formatEstablishmentDateTime,
  getEstablishmentCurrentDate,
} from '../utils/establishment-timezone-date'
import { buildEstablishmentWebsite } from '../utils/establishment-website'

interface EstablishmentContact {
  label: string
  icon: LucideIcon
  value: string
}

const formatEstablishmentAddress = (
  address: EstablishmentOrganizationProfileApiResponse['address'],
) => {
  const isEstablishmentAddressComplete = [
    address.street,
    address.number,
    address.neighborhood,
    address.city,
    address.state,
  ].every(Boolean)

  if (!isEstablishmentAddressComplete) {
    return 'Endereço não cadastrado'
  }

  const complement = address.complement ? ` - ${address.complement}` : ''

  return `${address.street}, ${address.number}${complement} - ${address.neighborhood}, ${address.city} - ${address.state}`
}

export function useEstablishmentTableRowDetails(
  establishment: EstablishmentOrganizationProfileApiResponse,
) {
  const { data: establishmentStorageImageUrl } = useStorageImage(
    getEstablishmentStorageImageKey(establishment.imageUrl),
  )

  const establishmentStatus = mapStatusEstablishment(establishment.status)
  const establishmentWebsiteUrl = buildEstablishmentWebsite(
    establishment.websiteUrl,
  )
  const establishmentAddress = formatEstablishmentAddress(establishment.address)
  const establishmentOpeningHoursByDay = openingHoursEstablishmentMapper(
    establishment.openingHours,
  )
  const establishmentCurrentDate = getEstablishmentCurrentDate(
    establishment.timezone,
  )
  const establishmentNextAppointment = formatEstablishmentDateTime(
    establishment.nextAppointmentAt,
    establishment.timezone,
  )

  const establishmentImageUrl =
    establishmentStorageImageUrl ?? establishment.imageUrl

  const establishmentTodayLabel = establishmentCurrentDate
    ? weekDaysLabels[establishmentCurrentDate.day()]
    : null

  const establishmentCityAndState = [
    establishment.address.city,
    establishment.address.state,
  ]
    .filter(Boolean)
    .join(' - ')

  const establishmentContacts: EstablishmentContact[] = [
    {
      label: 'E-mail',
      icon: MailIcon,
      value: establishment.email,
    },
    {
      label: 'Telefone',
      icon: PhoneIcon,
      value:
        establishment.phones.length > 0
          ? formattedPhone(establishment.phones[0])
          : 'N/A',
    },
    {
      label: 'Cidade',
      icon: MapPinIcon,
      value: establishmentCityAndState,
    },
  ].filter((establishmentContact) => Boolean(establishmentContact.value))

  const establishmentStats = [
    { label: 'Serviços', value: establishment.totalServices },
    { label: 'Colaboradores', value: establishment.totalCollaborators },
    { label: 'Avaliações', value: establishment.totalReviews },
  ]

  const establishmentGeneralDetails = [
    {
      label: 'Fuso horário',
      value: establishment.timezone,
    },
    {
      label: 'CEP',
      value: formattedZipCode(establishment.address.zipCode),
    },
    {
      label: 'Endereço',
      value: establishmentAddress,
    },
    {
      label: 'Contatos',
      value: establishment.phones.map(formattedPhone).join(' - '),
    },
  ]

  const establishmentAppointments = [
    {
      label: 'Hoje',
      value: `${establishment.todayAppointmentsTotal} agendamentos`,
    },
    {
      label: 'Próximo',
      value: establishmentNextAppointment,
    },
  ]

  return {
    establishmentImageUrl,
    establishmentStatus,
    establishmentOpeningHoursByDay,
    establishmentTodayLabel,
    establishmentContacts,
    establishmentStats,
    establishmentGeneralDetails,
    establishmentAppointments,
    establishmentWebsiteUrl,
  }
}
