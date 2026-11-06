import type { ColorPalette } from '@chakra-ui/react'

import type { StatusProps } from '@/components/ui/status'

export const StatusUserAuthenticated = {
  PENDING: 'pending',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  BLOCKED: 'blocked',
} as const

export type StatusUserAuthenticatedType =
  (typeof StatusUserAuthenticated)[keyof typeof StatusUserAuthenticated]

interface MapStatusUserAuthenticatedProps {
  label: string
  color: ColorPalette
  status: StatusProps['value']
}

export const mapLabelStatusUserAuthenticated: Record<
  StatusUserAuthenticatedType,
  string
> = {
  [StatusUserAuthenticated.PENDING]: 'Pendente',
  [StatusUserAuthenticated.ACTIVE]: 'Ativo',
  [StatusUserAuthenticated.INACTIVE]: 'Inativo',
  [StatusUserAuthenticated.BLOCKED]: 'Bloqueado',
}

export const mapStatusUserAuthenticated = (
  status?: StatusUserAuthenticatedType,
): MapStatusUserAuthenticatedProps => {
  const colorMap: Record<
    StatusUserAuthenticatedType | 'default',
    MapStatusUserAuthenticatedProps
  > = {
    [StatusUserAuthenticated.PENDING]: {
      label: 'Pendente',
      color: 'yellow',
      status: 'warning',
    },
    [StatusUserAuthenticated.ACTIVE]: {
      label: 'Ativo',
      color: 'green',
      status: 'success',
    },
    [StatusUserAuthenticated.INACTIVE]: {
      label: 'Inativo',
      color: 'gray',
      status: 'info',
    },
    [StatusUserAuthenticated.BLOCKED]: {
      label: 'Bloqueado',
      color: 'red',
      status: 'error',
    },
    default: {
      label: 'Desconhecido',
      color: 'gray',
      status: 'info',
    },
  }

  return colorMap[status as StatusUserAuthenticatedType] || colorMap['default']
}
