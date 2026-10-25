import z from 'zod'

export const CreateEstablishmentRequestSchema = z.strictObject({
  name: z.string(),
  slug: z.string().optional(),
  description: z.string(),
  email: z.string().optional(),
  phones: z.array(z.string()),
  timezone: z.string().optional(),
  imageUrl: z.string().nullable().optional(),
  legalEntityId: z.uuid().nullable().optional(),
})
