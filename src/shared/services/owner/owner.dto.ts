export interface OwnerModel {
  id: string
  userId: string
  name: string
  email: string
  phone: string
  cnpj: string
  businessName: string
  createdAt: string
  updatedAt: string
}

export interface CreateOwnerRequest {
  userId: string
  email: string
  cnpj: string
  name: string
  phone: string
  businessName: string
}

export interface UpdateOwnerRequest {
  id: string
  name: string
  phone: string
  businessName: string
}
