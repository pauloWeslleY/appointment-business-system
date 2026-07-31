import { mutationOptions } from '@tanstack/react-query'

import {
  createCollaboratorService,
  deleteCollaboratorService,
  inviteCollaboratorService,
  updateCollaboratorService,
} from '../services/collaborators.service'

export const collaboratorsMutationOptions = {
  create() {
    return mutationOptions({
      mutationKey: ['create-collaborators'],
      mutationFn: createCollaboratorService,
    })
  },

  update() {
    return mutationOptions({
      mutationKey: ['update-collaborators'],
      mutationFn: updateCollaboratorService,
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
