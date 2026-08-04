import { z } from 'zod'

export const StatusServiceEstablishmentSchema = z.object({
  id: z.uuid({ error: 'O id do estabelecimento de serviço é obrigatório' }),
  status: z.boolean({
    error: 'O status do estabelecimento de serviço é obrigatório',
  }),
})
