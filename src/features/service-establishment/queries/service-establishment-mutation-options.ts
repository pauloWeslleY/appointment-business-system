import { mutationOptions } from '@tanstack/react-query'

import {
  type UploadFileResponse,
  uploadFileToR2,
  UploadFolder,
} from '@/shared/services/storage/upload.service'
import { uploadFiles } from '@/shared/services/storage/upload-files'

import {
  createServiceEstablishmentService,
  statusServiceEstablishmentService,
  updateServiceEstablishmentService,
} from '../services/service-establishment.service'
import type { ServiceEstablishmentFormData } from '../types/form-service-establishment.type'
import type { ServiceEstablishmentModel } from '../types/service-establishment.model'

export const serviceEstablishmentMutationOptions = {
  create() {
    return mutationOptions<
      ServiceEstablishmentModel,
      Error,
      ServiceEstablishmentFormData & { establishmentId: string }
    >({
      mutationKey: ['create-establishment'],
      mutationFn: async (data) => {
        const urlFile = await uploadFiles(data.image, {
          id: data.establishmentId,
          folder: UploadFolder.SERVICES,
        })

        return createServiceEstablishmentService({
          ...data,
          imageUrl: urlFile,
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

  status() {
    return mutationOptions<
      ServiceEstablishmentModel,
      Error,
      { id: string; status: boolean }
    >({
      mutationKey: ['status-service-establishment'],
      mutationFn: statusServiceEstablishmentService,
    })
  },
}
