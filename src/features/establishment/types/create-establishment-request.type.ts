import type { AddressProps } from '@/shared/types/address.type'
import type { OpeningHoursDayProps } from '@/shared/types/opening-hours.type'

export interface CreateEstablishmentRequest {
  name: string
  description: string
  imageUrl: string
  phones: string[]
  openingHours: OpeningHoursDayProps[]
  ownerId: string
  address: AddressProps
}
