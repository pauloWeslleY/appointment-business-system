import z from 'zod'

import { EstablishmentStatusSchema } from '../types/establishment-status.type'

export const EstablishmentSchema = z.object({
  id: z.uuid(),
  ownerId: z.uuid(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  email: z.string(),
  phones: z.array(z.string()),
  timezone: z.string(),
  status: EstablishmentStatusSchema,
  imageUrl: z.string().nullable(),
  createdAt: z.iso.datetime({ offset: true }),
  updatedAt: z.iso.datetime({ offset: true }).nullable(),
})

export const EstablishmentAdminSchema = EstablishmentSchema.extend({
  organizationId: z.string(),
  legalEntityId: z.uuid().nullable(),
  deletedAt: z.iso.datetime({ offset: true }).nullable(),
})

export const EstablishmentAddressSchema = z.object({
  street: z.string(),
  number: z.string(),
  neighborhood: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
  complement: z.string().optional(),
})

export const EstablishmentOpeningHoursSchema = z.array(
  z.object({
    day: z.number().int().min(0).max(6),
    intervals: z.array(
      z.object({
        open: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
        close: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
      }),
    ),
  }),
)

export const EstablishmentSlugSchema = EstablishmentSchema.extend({
  address: EstablishmentAddressSchema,
  openingHours: EstablishmentOpeningHoursSchema,
})

export const EstablishmentOrganizationProfileSchema =
  EstablishmentAdminSchema.extend({
    address: EstablishmentAddressSchema,
    openingHours: EstablishmentOpeningHoursSchema,
    totalServices: z.number(),
    totalCollaborators: z.number(),
    totalReviews: z.number(),
    averageRating: z.number(),
    todayAppointmentsTotal: z.number(),
    nextAppointmentAt: z.iso.datetime({ offset: true }).nullable(),
  })

export const EstablishmentDetailsSchema = EstablishmentAdminSchema.extend({
  address: EstablishmentAddressSchema.omit({ zipCode: true })
    .extend({
      id: z.uuid(),
      establishmentId: z.uuid(),
      countryCode: z.string(),
      postalCode: z.string(),
      complement: z.string().nullable(),
      latitude: z.number().nullable(),
      longitude: z.number().nullable(),
      createdAt: z.iso.datetime({ offset: true }),
      updatedAt: z.iso.datetime({ offset: true }),
    })
    .nullable(),
})
