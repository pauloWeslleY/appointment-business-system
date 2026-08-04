import z from 'zod'

export const UpdateStatusCustomerSchema = z.object({
  id: z.uuid({ error: 'ID inválido' }),
  status: z.boolean({ error: 'Status é obrigatório' }),
})
