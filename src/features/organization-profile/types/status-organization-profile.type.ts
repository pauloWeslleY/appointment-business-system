import type { ColorPalette } from '@chakra-ui/react'
import z from 'zod'

export const StatusOrganizationProfile = {
  PENDING: 'pending',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
} as const

export const statusOrganizationProfile = z.enum(
  [
    StatusOrganizationProfile.PENDING,
    StatusOrganizationProfile.ACTIVE,
    StatusOrganizationProfile.INACTIVE,
    StatusOrganizationProfile.SUSPENDED,
  ],
  'O status é obrigatório do perfil',
)

export type StatusOrganizationProfileType =
  (typeof StatusOrganizationProfile)[keyof typeof StatusOrganizationProfile]

interface MapStatusOrganizationProfile {
  label: string
  color: ColorPalette
}

export const loadOptionsStatusOrganizationProfile = [
  { value: StatusOrganizationProfile.PENDING, label: 'Pendente' },
  { value: StatusOrganizationProfile.ACTIVE, label: 'Ativo' },
  { value: StatusOrganizationProfile.INACTIVE, label: 'Inativo' },
  { value: StatusOrganizationProfile.SUSPENDED, label: 'Suspenso' },
]

export const mapStatusOrganizationProfile = (
  statusKey: StatusOrganizationProfileType,
): MapStatusOrganizationProfile => {
  const status: Record<
    StatusOrganizationProfileType,
    MapStatusOrganizationProfile
  > = {
    [StatusOrganizationProfile.PENDING]: {
      label: 'Pendente',
      color: 'yellow',
    },
    [StatusOrganizationProfile.ACTIVE]: {
      label: 'Ativo',
      color: 'green',
    },
    [StatusOrganizationProfile.INACTIVE]: {
      label: 'Inativo',
      color: 'red',
    },
    [StatusOrganizationProfile.SUSPENDED]: {
      label: 'Suspenso',
      color: 'orange',
    },
  } as const

  return status[statusKey] || { label: 'Desconhecido', color: 'gray' }
}
