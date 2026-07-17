import { z } from 'zod'

export const EstablishmentFormSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  description: z.string().min(1, 'A descrição é obrigatória'),
  imageUrl: z
    .url('A URL da imagem é inválida')
    .min(1, 'A URL da imagem é obrigatória'),
  weekdays: z.array(z.string()).min(1, {
    message: 'É necessário selecionar pelo menos um dia de funcionamento',
  }),
  intervals: z
    .array(
      z.object({
        open: z.string().min(1, 'O horário de abertura é obrigatório'),
        close: z.string().min(1, 'O horário de fechamento é obrigatório'),
      }),
    )
    .min(
      1,
      'É necessário informar pelo menos um intervalo de horário de funcionamento',
    ),
  phones: z
    .array(
      z.object({
        phone: z.string().min(1, 'O telefone é obrigatório'),
      }),
    )
    .min(1, 'É necessário informar pelo menos um telefone'),
  address: z.object({
    street: z.string().min(1, 'O logradouro é obrigatório'),
    number: z.string().min(1, 'O número é obrigatório'),
    neighborhood: z.string().min(1, 'O bairro é obrigatório'),
    city: z.string().min(1, 'A cidade é obrigatória'),
    state: z.string().min(1, 'O estado é obrigatório'),
    zipCode: z.string().min(1, 'O CEP é obrigatório'),
    complement: z.string().min(1, 'O complemento é obrigatório'),
  }),
})
