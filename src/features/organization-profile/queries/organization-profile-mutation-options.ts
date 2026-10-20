import { mutationOptions } from '@tanstack/react-query'

import { createOrganizationProfileService } from '../services/organizaton-profile.service'
import { updateOwnerService } from '../services/owner.service'

export const organizationProfileMutationOptions = {
  create() {
    return mutationOptions({
      mutationKey: ['create-organization-profile'],
      mutationFn: createOrganizationProfileService,
    })
  },

  update() {
    return mutationOptions({
      mutationKey: ['update-owner'],
      mutationFn: updateOwnerService,
    })
  },
}
