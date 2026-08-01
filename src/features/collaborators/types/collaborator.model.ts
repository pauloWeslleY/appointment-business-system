import type { StatusCollaboratorType } from './status-collaborator.type'

export interface CollaboratorModel {
  id: string
  name: string
  userId: string | null
  imageUrl: string | null
  createdAt: string
  updatedAt: string | null
  email: string
  establishmentId: string
  cellphone: string
  document: string | null
  specialty: string
  status: StatusCollaboratorType
  workSchedule: string
  invitationToken: string | null
  invitationExpiresAt: string | null
  invitedAt: string | null
  acceptedAt: string | null
}
