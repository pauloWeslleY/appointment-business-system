export interface CreateServiceEstablishmentRequest {
  establishmentId: string
  name: string
  description: string
  imageUrl: string | null
  servicePriceInCents: number
}
