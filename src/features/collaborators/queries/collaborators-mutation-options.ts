import { mutationOptions } from '@tanstack/react-query'

import { UploadFolder } from '@/shared/services/storage/upload.service'
import { uploadFiles } from '@/shared/services/storage/upload-files'

import {
  createCollaboratorService,
  deleteCollaboratorService,
  inviteCollaboratorService,
  updateCollaboratorService,
} from '../services/collaborators.service'
import type { CollaboratorModel } from '../types/collaborator.model'
import type { CollaboratorsFormData } from '../types/form-collaborators.type'
import type { UpdateCollaboratorRequest } from '../types/update-collaborator.request'

export const collaboratorsMutationOptions = {
  create() {
    return mutationOptions<
      CollaboratorModel,
      Error,
      CollaboratorsFormData & { establishmentId: string }
    >({
      mutationKey: ['create-collaborators'],
      mutationFn: async (data) => {
        const urlFile = await uploadFiles(data.image, {
          id: data.establishmentId,
          folder: UploadFolder.COLLABORATORS,
        })

        return createCollaboratorService({
          name: data.name,
          email: data.email,
          cellphone: data.cellphone,
          document: data.document,
          specialty: data.specialty,
          workSchedule: data.workSchedule,
          establishmentId: data.establishmentId,
          imageUrl: urlFile,
        })
      },
    })
  },

  update() {
    return mutationOptions<
      CollaboratorModel,
      Error,
      Omit<UpdateCollaboratorRequest, 'imageUrl'> & { image: File | null }
    >({
      mutationKey: ['update-collaborators'],
      mutationFn: async (data) => {
        const urlFile = await uploadFiles(data.image, {
          id: data.establishmentId,
          folder: UploadFolder.COLLABORATORS,
        })

        return updateCollaboratorService({
          id: data.id,
          name: data.name,
          email: data.email,
          cellphone: data.cellphone,
          document: data.document,
          specialty: data.specialty,
          workSchedule: data.workSchedule,
          establishmentId: data.establishmentId,
          imageUrl: urlFile,
        })
      },
    })
  },

  invite() {
    return mutationOptions({
      mutationKey: ['invite-collaborators'],
      mutationFn: inviteCollaboratorService,
    })
  },

  inactive() {
    return mutationOptions({
      mutationKey: ['inactive-collaborators'],
      mutationFn: deleteCollaboratorService,
    })
  },
}
