import type { AddressProps } from '@/shared/types/address.type'
import type { OpeningHoursDayProps } from '@/shared/types/opening-hours.type'

export interface EstablishmentModel {
  id: string
  name: string
  slug: string
  description: string
  imageUrl: string | null
  phones: string[]
  openingHours: OpeningHoursDayProps[]
  createdAt: string
  updatedAt: string
  ownerId: string
  address: AddressProps
  totalServices: number
  totalCollaborators: number
  totalRatings: number
  averageRating: number
  todayBookingsTotal: number
  nextBookingAt: string | null
}

export type EstablishmentSlugModel = Omit<
  EstablishmentModel,
  | 'totalServices'
  | 'totalCollaborators'
  | 'totalRatings'
  | 'averageRating'
  | 'todayBookingsTotal'
  | 'nextBookingAt'
>
