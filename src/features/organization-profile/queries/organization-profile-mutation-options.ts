import { mutationOptions } from '@tanstack/react-query'

import {
  createOrganizationProfileService,
  deleteOrganizationProfileService,
  updateOrganizationProfileService,
} from '../services/organizaton-profile.service'

export const organizationProfileMutationOptions = {
  create() {
    return mutationOptions({
      mutationKey: ['create-organization-profile'],
      mutationFn: createOrganizationProfileService,
    })
  },

  update() {
    return mutationOptions({
      mutationKey: ['update-organization-profile'],
      mutationFn: updateOrganizationProfileService,
    })
  },

  delete() {
    return mutationOptions({
      mutationKey: ['delete-organization-profile'],
      mutationFn: deleteOrganizationProfileService,
    })
  },
}
