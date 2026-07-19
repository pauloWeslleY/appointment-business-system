import { mutationOptions } from '@tanstack/react-query'

import { uploadFileToR2 } from '@/shared/services/storage/upload.service'

import {
  createEstablishmentService,
  updateEstablishmentService,
  uploadImageEstablishmentService,
} from '../api/establishment.service'
import type { EstablishmentModel } from '../types/establishment.model'

export const establishmentMutationOptions = {
  create() {
    return mutationOptions({
      mutationKey: ['create-establishment'],
      mutationFn: createEstablishmentService,
    })
  },

  update() {
    return mutationOptions({
      mutationKey: ['update-establishment'],
      mutationFn: updateEstablishmentService,
    })
  },

  uploadImage() {
    return mutationOptions<
      EstablishmentModel,
      Error,
      { id: string; image: File }
    >({
      mutationKey: ['upload-establishment-image'],
      mutationFn: async (data) => {
        const urlImage = await uploadFileToR2({
          id: data.id,
          file: data.image,
          folder: 'establishment',
        })

        return await uploadImageEstablishmentService({
          establishmentId: data.id,
          imageUrl: urlImage.key,
        })
      },
    })
  },
}
