import { mutationOptions } from '@tanstack/react-query'

import {
  type UploadFileResponse,
  uploadFileToR2,
} from '@/shared/services/storage/upload.service'

import {
  createServiceEstablishmentService,
  updateServiceEstablishmentService,
} from '../services/service-establishment.service'
import type { ServiceEstablishmentFormData } from '../types/form-service-establishment.type'
import type { ServiceEstablishmentModel } from '../types/service-esatablishment.model'

export const serviceEstablishmentMutationOptions = {
  create() {
    return mutationOptions<
      ServiceEstablishmentModel,
      Error,
      ServiceEstablishmentFormData & { establishmentId: string }
    >({
      mutationKey: ['create-establishment'],
      mutationFn: async (data) => {
        let urlImage: UploadFileResponse | undefined

        if (data.image) {
          urlImage = await uploadFileToR2({
            id: data.establishmentId,
            file: data.image,
            folder: 'services',
          })
        }

        return createServiceEstablishmentService({
          ...data,
          imageUrl: urlImage?.key ?? null,
        })
      },
    })
  },

  update() {
    return mutationOptions<
      ServiceEstablishmentModel,
      Error,
      ServiceEstablishmentFormData & {
        establishmentId: string
        serviceEstablishmentId: string
      }
    >({
      mutationKey: ['update-establishment'],
      mutationFn: async (data) => {
        let urlImage: UploadFileResponse | undefined

        if (data.image) {
          urlImage = await uploadFileToR2({
            id: data.establishmentId,
            file: data.image,
            folder: 'services',
          })
        }

        return updateServiceEstablishmentService({
          ...data,
          id: data.serviceEstablishmentId,
          imageUrl: urlImage?.key ?? null,
        })
      },
    })
  },
}
