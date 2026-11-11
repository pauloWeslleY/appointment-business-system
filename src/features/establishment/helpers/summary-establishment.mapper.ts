import { formattedPhone } from '@/shared/utils/formatted-mask'

import type { EstablishmentSlugApiResponse } from '../types/get-establishment-api.response.type'

export const CUSTOM_RENDERED_LABELS_ESTABLISHMENT = new Set([
  'Horário de funcionamento',
  'Status',
])

export function hasCustomRenderingEstablishment(label: string) {
  return CUSTOM_RENDERED_LABELS_ESTABLISHMENT.has(label)
}

export function establishmentPhonesFormatted(phones: string[]) {
  return phones.map(formattedPhone).join(' - ')
}

export function establishmentAddressFormatted(
  establishment: Pick<EstablishmentSlugApiResponse, 'address'>,
) {
  const isAddressComplete = Object.values(establishment.address).every(Boolean)

  if (!isAddressComplete) {
    return 'N/A'
  }

  return `
    ${establishment.address.street}, 
    ${establishment.address.number} - 
    ${establishment.address.neighborhood}, 
    ${establishment.address.city} - 
    ${establishment.address.state}
  `
}
