import z from 'zod'

export const CustomerApiResponseSchema = z.object({
  id: z.uuid(),
  organizationId: z.string(),
  name: z.string(),
  email: z.email(),
  phones: z.array(z.string()),
  gender: z.string().nullable(),
  notes: z.string().nullable(),
  status: z.boolean(),
  active: z.boolean(),
  birthDate: z.iso.datetime({ offset: true }).nullable(),
  userId: z.string().nullable(),
  createdAt: z.iso.datetime({ offset: true }),
  updatedAt: z.iso.datetime({ offset: true }),
  deletedAt: z.iso.datetime({ offset: true }).nullable(),
})

export const CustomersApiResponseSchema = z.array(CustomerApiResponseSchema)
