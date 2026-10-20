export interface CreateEstablishmentRequest {
  name: string
  slug?: string
  description: string
  email?: string
  phones: string[]
  timezone?: string
  imageUrl?: string | null
  legalEntityId?: string | null
}
