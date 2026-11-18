import type { ColorPalette } from '@chakra-ui/react'

import type { StatusProps } from '@/components/ui/status'

export const StatusServiceEstablishment = {
  ACTIVE: 'ativo',
  INACTIVE: 'inativo',
} as const

export const StatusServiceEstablishmentTypeColor = {
  color: 'color',
  status: 'status',
} as const

export type StatusServiceEstablishmentTypeColorType =
  (typeof StatusServiceEstablishmentTypeColor)[keyof typeof StatusServiceEstablishmentTypeColor]

export type StatusServiceEstablishmentType =
  (typeof StatusServiceEstablishment)[keyof typeof StatusServiceEstablishment]

export const verifyStatusServiceEstablishment = (
  status: boolean,
): StatusServiceEstablishmentType => {
  return status
    ? StatusServiceEstablishment.ACTIVE
    : StatusServiceEstablishment.INACTIVE
}

export const mapLabelStatusServiceEstablishment = (
  status: StatusServiceEstablishmentType,
): string => {
  const map: Record<StatusServiceEstablishmentType, string> = {
    [StatusServiceEstablishment.ACTIVE]: 'Ativo',
    [StatusServiceEstablishment.INACTIVE]: 'Inativo',
  }
  return map[status]
}

interface StatusServiceEstablishmentMap {
  label: string
  color: ColorPalette | StatusProps['value']
}

export const mapColorStatusServiceEstablishment = (
  status: boolean,
  color?: StatusServiceEstablishmentTypeColorType,
): StatusServiceEstablishmentMap => {
  const verifiedStatus = verifyStatusServiceEstablishment(status)
  const statusLabel = mapLabelStatusServiceEstablishment(verifiedStatus)

  const mapColor: Record<StatusServiceEstablishmentType, ColorPalette> = {
    [StatusServiceEstablishment.ACTIVE]: 'green',
    [StatusServiceEstablishment.INACTIVE]: 'red',
  }

  const mapStatus: Record<
    StatusServiceEstablishmentType,
    StatusProps['value']
  > = {
    [StatusServiceEstablishment.ACTIVE]: 'success',
    [StatusServiceEstablishment.INACTIVE]: 'error',
  }

  switch (color) {
    case StatusServiceEstablishmentTypeColor.color:
      return {
        label: statusLabel,
        color: mapColor[verifiedStatus],
      }
    case StatusServiceEstablishmentTypeColor.status:
      return {
        label: statusLabel,
        color: mapStatus[verifiedStatus],
      }
    default:
      return {
        label: statusLabel,
        color: 'gray',
      }
  }
}
