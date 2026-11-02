import z from 'zod'

export const QueryParamsListTaxInformationApiSchema = z.object({
  limit: z
    .number()
    .int()
    .min(1, 'Limite obrigatório')
    .max(100, 'Limite máximo 100')
    .nullish(),
  cursor: z.uuid().trim().min(1, 'Cursor obrigatório').nullish(),
})
