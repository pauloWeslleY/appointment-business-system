import { z } from 'zod'

import { InputPasswordSchema } from './password.schema'

export const RegisterFormSchema = z.object({
  username: z.string().min(1, 'O usuário é obrigatório'),
  email: z.email('O e-mail é inválido').min(1, 'O e-mail é obrigatório'),
  password: InputPasswordSchema,
})
