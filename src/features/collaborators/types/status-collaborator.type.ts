export const StatusCollaborator = {
  PENDING: 'pending',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
} as const

export type StatusCollaboratorType =
  (typeof StatusCollaborator)[keyof typeof StatusCollaborator]

type MapLabelStatusCollaboratorProps = Record<StatusCollaboratorType, string>

export const mapLabelStatusCollaborator: MapLabelStatusCollaboratorProps = {
  [StatusCollaborator.PENDING]: 'Pendente',
  [StatusCollaborator.ACTIVE]: 'Ativo',
  [StatusCollaborator.INACTIVE]: 'Inativo',
}
