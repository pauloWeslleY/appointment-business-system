export interface EstablishmentAdminModel {
  id: string
  organizationId: string
  ownerId: string
  legalEntityId: string | null
  name: string
  slug: string
  description: string
  email: string
  phones: string[]
  timezone: string
  status: 'draft' | 'active' | 'inactive' | 'suspended'
  imageUrl: string | null
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  address?: {
    id: string
    establishmentId: string
    countryCode: string
    postalCode: string
    state: string
    city: string
    neighborhood: string
    street: string
    number: string
    complement: string | null
    latitude: number | null
    longitude: number | null
    createdAt: string
    updatedAt: string
  } | null
}
