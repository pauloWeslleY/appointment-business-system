import type { ColorPalette } from '@chakra-ui/react'
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
  color: ColorPalette
}

export const mapStatusEstablishment = (status?: EstablishmentStatusType) => {
  const statusMap: Record<EstablishmentStatusType, EstablishmentStatusProps> = {
    [EstablishmentStatus.DRAFT]: { label: 'Rascunho', color: 'blue' },
    [EstablishmentStatus.ACTIVE]: { label: 'Ativo', color: 'green' },
    [EstablishmentStatus.INACTIVE]: { label: 'Inativo', color: 'red' },
    [EstablishmentStatus.SUSPENDED]: { label: 'Suspenso', color: 'yellow' },
  }

  return status ? statusMap[status] : { label: 'Desconhecido', color: 'gray' }
}
