export interface ServiceEstablishmentModel {
  id: string
  name: string
  description: string
  imageUrl: string | null
  servicePriceInCents: number
  establishmentId: string
  createdAt: string
  updatedAt: string | null
}

export interface CreateServiceEstablishmentRequest {
  establishmentId: string
  name: string
  description: string
  imageUrl: string | null
  servicePriceInCents: number
}
