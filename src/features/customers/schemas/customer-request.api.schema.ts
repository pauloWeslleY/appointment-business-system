import z from 'zod'

const customerFields = {
  name: z.string().trim().min(1).max(200),
  email: z.email(),
  phones: z.array(z.string().trim().min(1)).min(1),
  gender: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  birthDate: z
    .union([z.iso.date(), z.iso.datetime({ offset: true })])
    .nullable()
    .optional(),
  userId: z.string().trim().min(1).nullable().optional(),
}

export const CreateCustomerApiRequestSchema = z.object({
  ...customerFields,
  establishmentId: z.uuid(),
})

export const UpdateCustomerApiRequestSchema = z.object({
  ...customerFields,
  id: z.uuid(),
})

export const CustomerIdApiRequestSchema = z.uuid()

export const CustomersEstablishmentApiRequestSchema = z.uuid()
