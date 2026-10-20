import type z from 'zod'

import type {
  CreateOrganizationProfileApiResponse,
  CreateOrganizationProfileFormSchema,
} from '../schemas/create-organization-profile.schema'

export type CreateOrganizationProfileFormData = z.infer<
  typeof CreateOrganizationProfileFormSchema
>

export type CreateProfileOrganizationResponse = z.infer<
  typeof CreateOrganizationProfileApiResponse
>

export interface CreateProfileOrganizationRequest {
  idempotencyKey: string
  name: string
  slug: string
  profile: {
    legalName: string
    tradeName: string
    email: string
    phone: string
  }
}
