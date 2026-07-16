import type { EstablishmentModel } from '../establishment/establishment.dto'

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

export interface ServiceEstablishmentDetailsModel {
  id: string
  name: string
  description: string
  imageUrl: string | null
  servicePriceInCents: number
  establishmentId: string
  createdAt: string
  updatedAt: string | null
  bookings: {
    id: string
    createdAt: string
    updatedAt: string | null
    date: string
    userId: string
    serviceId: string
  }[]
  establishment: EstablishmentModel
}

export interface CreateServiceEstablishmentRequest {
  establishmentId: string
  name: string
  description: string
  imageUrl: string | null
  servicePriceInCents: number
}
