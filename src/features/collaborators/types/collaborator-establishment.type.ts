import type { StatusCollaboratorType } from './status-collaborator.type'

export interface CollaboratorEstablishmentModel {
  id: string
  name: string
  email: string
  cellphone: string
  document: string | null
  specialty: string
  imageUrl: string | null
  status: StatusCollaboratorType
  workSchedule: string
  createdAt: string
  updatedAt: string | null
}
