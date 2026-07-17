export interface AccountModel {
  id: string
  name: string
  email: string
  image: string | null
  emailVerified: boolean
  createdAt: string
  updatedAt: string | null
  accessToken: string
}
