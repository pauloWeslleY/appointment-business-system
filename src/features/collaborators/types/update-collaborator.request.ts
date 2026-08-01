export interface UpdateCollaboratorRequest {
  id: string
  name: string
  email: string
  cellphone: string
  document: string
  specialty: string
  imageUrl: string | null
  workSchedule: string
  establishmentId: string
}
