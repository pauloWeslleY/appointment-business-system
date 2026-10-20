import z from 'zod'

import { StatusOrganizationProfile } from '../types/status-organization-profile.type'

export const UpdateOrganizationProfileFormSchema = z.object({
  legalName: z.string().min(1, 'A razão social é obrigatório do perfil'),
  tradeName: z.string().min(1, 'O nome fantasia é obrigatório do perfil'),
  email: z.email('O e-mail é obrigatório do perfil'),
  phone: z.string().min(1, 'O telefone é obrigatório do perfil'),
  status: z.enum(
    [StatusOrganizationProfile.ACTIVE, StatusOrganizationProfile.INACTIVE],
    'O status é obrigatório do perfil',
  ),
})
