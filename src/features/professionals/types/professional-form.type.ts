import type { UseFormReturn } from 'react-hook-form'
import type z from 'zod'

import type { ProfessionalFormSchema } from '../schemas/professional-form.schema'
import type { ProfessionalDetailsApiResponse } from './professional-api.type'

export type ProfessionalFormInput = z.input<typeof ProfessionalFormSchema>

export type ProfessionalFormData = z.output<typeof ProfessionalFormSchema>

export type ProfessionalFormMethods = UseFormReturn<
  ProfessionalFormInput,
  unknown,
  ProfessionalFormData
>

export type ProfessionalFormDirtyFields =
  ProfessionalFormMethods['formState']['dirtyFields']

export interface CreateProfessionalFormRequest {
  values: ProfessionalFormData
  establishmentId: string
}

export interface UpdateProfessionalFormRequest {
  values: ProfessionalFormData
  details: ProfessionalDetailsApiResponse
  updateProfile: boolean
  updateEmployment: boolean
}
