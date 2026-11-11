import z from 'zod'

import { WorkScheduleApiSchema } from './professional-response.api.schema'

const professionalProfileRequestFields = {
  displayName: z.string().trim().min(1).max(160),
  email: z.email().nullable(),
  phone: z.string().max(40).nullable(),
  document: z.string().max(2000).nullable(),
  bio: z.string().max(2000).nullable(),
  imageUrl: z.string().max(2000).nullable(),
}

export const UpdateProfessionalApiRequestSchema = z
  .object(professionalProfileRequestFields)
  .strict()

export const EmploymentApiRequestSchema = z
  .object({
    specialty: z.string().trim().min(1).max(160),
    status: z.enum(['active', 'inactive', 'suspended']),
    workSchedule: WorkScheduleApiSchema,
    establishmentIds: z.array(z.uuid()).max(500),
  })
  .strict()

export const CreateProfessionalApiRequestSchema = z
  .object({
    displayName: professionalProfileRequestFields.displayName,
    email: professionalProfileRequestFields.email.optional(),
    phone: professionalProfileRequestFields.phone.optional(),
    document: professionalProfileRequestFields.document.optional(),
    bio: professionalProfileRequestFields.bio.optional(),
    imageUrl: professionalProfileRequestFields.imageUrl.optional(),
    ...EmploymentApiRequestSchema.shape,
    status: EmploymentApiRequestSchema.shape.status.default('active'),
    userId: z.string().min(1).nullable().optional(),
  })
  .strict()

export const ProfessionalIdApiRequestSchema = z.uuid()

export const ProfessionalAvailabilityApiRequestSchema = z
  .object({
    professionalId: z.uuid(),
    establishmentId: z.uuid(),
    organizationId: z.string().min(1),
    startsAt: z.iso.datetime(),
    endsAt: z.iso.datetime(),
  })
  .strict()
