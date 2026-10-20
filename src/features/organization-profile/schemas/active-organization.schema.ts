import { z } from 'zod'

export const ActiveOrganizationSchema = z.object({
  organizationId: z.array(
    z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? 'O ID da organização é obrigatório'
            : undefined,
      })
      .min(1, 'Selecione uma organização'),
  ),
})
