export interface ListServicesEstablishmentModel {
  id: string
  name: string
  description: string
  imageUrl: string | null
  status: boolean
  servicePriceInCents: number
  totalBookings: number
  createdAt: string
  updatedAt: string | null
}
