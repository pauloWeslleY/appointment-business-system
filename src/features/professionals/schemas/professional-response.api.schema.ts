import z from 'zod'

export const WorkScheduleApiSchema = z
  .array(
    z.object({
      dayOfWeek: z.number().int().min(0).max(6),
      startsAt: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
      endsAt: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
    }),
  )
  .max(84)
  .nullable()

export const ProfessionalApiResponseSchema = z.object({
  id: z.uuid(),
  userId: z.string().nullable(),
  displayName: z.string(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
  document: z.string().nullable(),
  bio: z.string().nullable(),
  imageUrl: z.string().nullable(),
  createdAt: z.iso.datetime({ offset: true }),
  updatedAt: z.iso.datetime({ offset: true }),
})

export const EmploymentApiResponseSchema = z.object({
  id: z.uuid(),
  professionalId: z.uuid(),
  organizationId: z.string(),
  specialty: z.string(),
  status: z.enum(['active', 'inactive', 'suspended']),
  workSchedule: WorkScheduleApiSchema,
  establishmentIds: z.array(z.uuid()),
  createdAt: z.iso.datetime({ offset: true }),
  updatedAt: z.iso.datetime({ offset: true }),
})

export const ProfessionalDetailsApiResponseSchema = z.object({
  professional: ProfessionalApiResponseSchema,
  employment: EmploymentApiResponseSchema,
})

export const ProfessionalListItemApiResponseSchema =
  ProfessionalApiResponseSchema.pick({
    id: true,
    displayName: true,
    bio: true,
    imageUrl: true,
  }).extend({ specialty: z.string() })
export const ProfessionalListApiResponseSchema = z.object({
  professionals: z.array(ProfessionalListItemApiResponseSchema),
})

export const UpdateProfessionalApiResponseSchema = z.object({
  professional: ProfessionalApiResponseSchema,
})

export const UpdateEmploymentApiResponseSchema = z.object({
  employment: EmploymentApiResponseSchema,
})

export const ProfessionalAvailabilityApiResponseSchema = z.object({
  professionalId: z.uuid(),
  available: z.literal(true),
})
