export interface CreateCustomerRequest {
  name: string
  email: string
  phones: string[]
  gender: string
  notes: string
  birthDate: string | null
  userId: string
  establishmentId: string
}
