import { z } from 'zod'

export const RegisterFormSchema = z.object({
  username: z.string().min(1, 'O usuário é obrigatório'),
  email: z.email('O e-mail é inválido').min(1, 'O e-mail é obrigatório'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
})
