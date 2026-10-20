import type { CreateEstablishmentRequest } from './create-establishment-request.type'

export interface UpdateEstablishmentRequest extends CreateEstablishmentRequest {
  id: string
}
