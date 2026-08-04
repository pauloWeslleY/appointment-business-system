export interface CreateCustomerRequest {
  name: string
  email: string
  phones: string[]
  notes: string | null
  gender: string | null
  birthDate: string | null
  userId: string | null
  establishmentId: string
}
