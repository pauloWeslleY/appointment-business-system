import z from 'zod'

export const GetOrganizationProfileModel = z.object({
  id: z.uuid('O ID é obrigatório'),
  organizationId: z.uuid('O ID da organização é obrigatório'),
  legalName: z.string().min(1, 'O nome legal é obrigatório'),
  tradeName: z.string().min(1, 'O nome fantasia é obrigatório'),
  email: z.email('O email é obrigatório'),
  status: z.enum(['pending', 'active', 'inactive'], 'O status é obrigatório'),
  createdAt: z.string().min(1, 'A data de criação é obrigatória'),
  updatedAt: z.string().min(1, 'A data de atualização é obrigatória'),
  deletedAt: z.string().min(1, 'A data de exclusão é obrigatória'),
})
