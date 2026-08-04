import { type ColorPalette } from '@chakra-ui/react'

export const StatusCollaborator = {
  PENDING: 'pending',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
} as const

export type StatusCollaboratorType =
  (typeof StatusCollaborator)[keyof typeof StatusCollaborator]

type MapLabelStatusCollaboratorProps = Record<StatusCollaboratorType, string>

export const mapColorStatusCollaborator: Record<
  StatusCollaboratorType,
  ColorPalette
> = {
  [StatusCollaborator.PENDING]: 'yellow',
  [StatusCollaborator.ACTIVE]: 'green',
  [StatusCollaborator.INACTIVE]: 'red',
} as const

export const mapLabelStatusCollaborator = (
  status: StatusCollaboratorType | string,
) => {
  const mapLabelStatusCollaborator: MapLabelStatusCollaboratorProps = {
    [StatusCollaborator.PENDING]: 'Pendente',
    [StatusCollaborator.ACTIVE]: 'Ativo',
    [StatusCollaborator.INACTIVE]: 'Inativo',
  }

  return (
    mapLabelStatusCollaborator[status as StatusCollaboratorType] ||
    'Desconhecido'
  )
}
