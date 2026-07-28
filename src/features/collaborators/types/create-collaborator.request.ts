export interface CreateCollaboratorRequest {
  name: string
  email: string
  cellphone: string
  document: string
  specialty: string
  imageUrl: string | null
  workSchedule: string
  establishmentId: string
}
