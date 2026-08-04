import { z } from 'zod'

export const CreateOwnerFormSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  cnpj: z.string().min(1, 'O CNPJ é obrigatório'),
  phone: z.string().min(1, 'O telefone é obrigatório'),
  email: z.email('O e-mail é inválido').min(1, 'O e-mail é obrigatório'),
})
