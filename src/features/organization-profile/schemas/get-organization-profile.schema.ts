import z from 'zod'

import { statusOrganizationProfile } from '../types/status-organization-profile.type'

export const GetOrganizationProfileModel = z.object({
  id: z.uuid('O ID é obrigatório'),
  organizationId: z.string('O ID da organização é obrigatório'),
  legalName: z.string().min(1, 'O nome legal é obrigatório'),
  tradeName: z.string().min(1, 'O nome fantasia é obrigatório'),
  email: z.email('O email é obrigatório'),
  phone: z.string().min(1, 'O telefone é obrigatório'),
  status: statusOrganizationProfile,
  createdAt: z.string().min(1, 'A data de criação é obrigatória'),
  updatedAt: z.string().min(1, 'A data de atualização é obrigatória'),
  deletedAt: z.string().nullable(),
})
