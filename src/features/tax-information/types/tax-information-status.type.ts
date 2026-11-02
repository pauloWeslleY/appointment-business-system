import type { ColorPalette } from '@chakra-ui/react'

export const LEGAL_ENTITY_STATUSES = {
  PENDING: 'pending',
  ACTIVE: 'active',
  SUSPENDED: 'suspended',
  INACTIVE: 'inactive',
} as const

export type LegalEntityStatus =
  (typeof LEGAL_ENTITY_STATUSES)[keyof typeof LEGAL_ENTITY_STATUSES]

interface MapStatusLegalEntityProps {
  label: string
  color: ColorPalette
}

type MapStatusLegalEntityType = Record<
  LegalEntityStatus | 'UNKNOWN',
  MapStatusLegalEntityProps
>

export const mapStatusLegalEntity = (status?: LegalEntityStatus) => {
  const map: MapStatusLegalEntityType = {
    [LEGAL_ENTITY_STATUSES.PENDING]: {
      label: 'Pendente',
      color: 'yellow',
    },
    [LEGAL_ENTITY_STATUSES.ACTIVE]: {
      label: 'Ativo',
      color: 'green',
    },
    [LEGAL_ENTITY_STATUSES.SUSPENDED]: {
      label: 'Suspenso',
      color: 'orange',
    },
    [LEGAL_ENTITY_STATUSES.INACTIVE]: {
      label: 'Inativo',
      color: 'red',
    },
    UNKNOWN: {
      label: 'Desconhecido',
      color: 'gray',
    },
  }

  return map[status as LegalEntityStatus] || map.UNKNOWN
}
