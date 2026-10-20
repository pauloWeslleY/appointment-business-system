import z from 'zod'

import { statusOrganizationProfile } from '../types/status-organization-profile.type'

export const CreateOrganizationProfileFormSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  profile: z.object({
    email: z.email('O e-mail é obrigatório do perfil'),
    legalName: z.string().min(1, 'A razão social é obrigatório do perfil'),
    tradeName: z.string().min(1, 'O nome fantasia é obrigatório do perfil'),
    phone: z.string().min(1, 'O telefone é obrigatório do perfil'),
  }),
})

export const CreateOrganizationProfileApiResponse = z.object({
  organization: z.object({
    id: z.string().min(1, 'O ID é obrigatório'),
    name: z.string().min(1, 'O nome é obrigatório'),
    slug: z.string().min(1, 'O slug é obrigatório'),
  }),
  profile: z.object({
    id: z.uuid('O ID é obrigatório do perfil'),
    legalName: z.string().min(1, 'O nome legal é obrigatório do perfil'),
    tradeName: z.string().min(1, 'O nome fantasia é obrigatório do perfil'),
    phone: z.string().min(1, 'O telefone é obrigatório do perfil'),
    email: z.string().min(1, 'O email é obrigatório do perfil'),
    status: statusOrganizationProfile,
    createdAt: z.iso.datetime('A data de criação é obrigatória do perfil'),
    updatedAt: z.iso.datetime('A data de atualização é obrigatória do perfil'),
    deletedAt: z.iso.datetime().nullable(),
  }),
  created: z.boolean({
    error: (issue) =>
      issue.input === undefined
        ? 'O campo created é obrigatório'
        : 'O campo created deve ser booleano',
  }),
})
