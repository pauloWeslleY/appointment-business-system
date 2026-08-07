export interface ServiceEstablishmentModel {
  id: string
  name: string
  description: string
  imageUrl: string | null
  status: boolean
  servicePriceInCents: number
  establishmentId: string
  createdAt: string
  updatedAt: string | null
}
