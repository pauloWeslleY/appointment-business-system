import { mutationOptions } from '@tanstack/react-query'

import {
  updateRoleMemberService,
  updateScopeMemberService,
  updateStatusMemberService,
} from '../services/member.service'
import { createMeContextService } from '../services/member-context.service'

export const memberMutationOptions = {
  create() {
    return mutationOptions({
      mutationKey: ['create-me-context'],
      mutationFn: createMeContextService,
    })
  },

  updateScope() {
    return mutationOptions({
      mutationKey: ['update-scope-member'],
      mutationFn: updateScopeMemberService,
    })
  },

  updateStatus() {
    return mutationOptions({
      mutationKey: ['update-status-member'],
      mutationFn: updateStatusMemberService,
    })
  },

  updateRole() {
    return mutationOptions({
      mutationKey: ['update-role-member'],
      mutationFn: updateRoleMemberService,
    })
  },
}
