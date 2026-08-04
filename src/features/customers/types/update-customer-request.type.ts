export interface UpdateCustomerRequest {
  id: string
  name: string
  email: string
  phones: string[]
  gender: string
  notes: string
  birthDate: string | null
  userId: string
}
