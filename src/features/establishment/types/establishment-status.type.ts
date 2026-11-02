import z from 'zod'

export const EstablishmentStatus = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
} as const

export const EstablishmentStatusSchema = z.enum(EstablishmentStatus)

export type EstablishmentStatusType = z.infer<typeof EstablishmentStatusSchema>

interface EstablishmentStatusProps {
  label: string
  color: 'success' | 'error' | 'warning' | 'info'
}

export const mapStatusEstablishment = (status?: EstablishmentStatusType) => {
  const statusMap: Record<EstablishmentStatusType, EstablishmentStatusProps> = {
    [EstablishmentStatus.DRAFT]: { label: 'Rascunho', color: 'info' },
    [EstablishmentStatus.ACTIVE]: { label: 'Ativo', color: 'success' },
    [EstablishmentStatus.INACTIVE]: { label: 'Inativo', color: 'error' },
    [EstablishmentStatus.SUSPENDED]: { label: 'Suspenso', color: 'warning' },
  }
  return status ? statusMap[status] : { label: 'Desconhecido', color: 'info' }
}
