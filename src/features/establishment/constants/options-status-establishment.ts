import { createListCollection } from '@chakra-ui/react'

import {
  EstablishmentStatus,
  type EstablishmentStatusType,
  mapStatusEstablishment,
} from '../types/establishment-status.type'

const formattedOptionLabelEstablishment = (status: EstablishmentStatusType) => {
  const statusProps = mapStatusEstablishment(status)
  return statusProps.label
}

export const loadSelectStatusUpdateEstablishment = createListCollection({
  items: Object.values(EstablishmentStatus).map((status) => ({
    label: formattedOptionLabelEstablishment(status),
    value: status,
  })),
})
