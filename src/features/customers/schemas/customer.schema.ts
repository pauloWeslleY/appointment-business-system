import z from 'zod'

export const CustomerSchema = z.object({
  name: z.string().trim().min(1, {
    error: 'Nome é obrigatório',
  }),
  email: z.email('E-mail inválido').trim().min(1, {
    error: 'E-mail é obrigatório',
  }),
  phones: z
    .array(
      z.string().trim().min(1, {
        error: 'Telefone é obrigatório',
      }),
    )
    .min(1, {
      error: 'Pelo menos um telefone é obrigatório',
    }),

  gender: z
    .enum(['male', 'female', 'other'], {
      error: 'Gênero inválido',
    })
    .optional(),
  notes: z.string().trim().optional(),
  birthDate: z.string().trim().min(1, {
    error: 'Data é obrigatória',
  }),
})
