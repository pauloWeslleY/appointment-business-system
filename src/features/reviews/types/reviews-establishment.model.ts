export interface ReviewEstablishmentModel {
  id: string
  createdAt: string
  updatedAt: string
  rating: number
  comment: string
  user: {
    id: string
    name: string
    email: string
    image: string | null
  }
  establishment: {
    id: string
    name: string
  }
}
