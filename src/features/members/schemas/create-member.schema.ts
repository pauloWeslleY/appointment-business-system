import z from 'zod'

export const CreatMemberRequest = z.strictObject({
  organizationId: z.string().trim().min(1),
  establishmentId: z.uuid().optional(),
})
