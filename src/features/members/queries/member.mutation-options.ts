import {
  type MutationFunctionContext,
  mutationOptions,
} from '@tanstack/react-query'

import {
  updateRoleMemberService,
  updateScopeMemberService,
  updateStatusMemberService,
} from '../services/member.service'
import { createMeContextService } from '../services/member-context.service'
import { memberQueryKey } from './member.query-key'
import { cacheSelectedMemberContext } from './member-context-cache'

function invalidateMemberCache(
  _data: unknown,
  _variables: unknown,
  _result: unknown,
  { client }: MutationFunctionContext,
): Promise<void> {
  return client.invalidateQueries({ queryKey: memberQueryKey.all })
}

export const memberMutationOptions = {
  create() {
    return mutationOptions({
      mutationKey: ['create-me-context'],
      mutationFn: createMeContextService,
      onMutate: async (_variables, { client }) => {
        await client.cancelQueries()
      },
      onSuccess: (data, _variables, _result, { client }) =>
        cacheSelectedMemberContext(client, data),
    })
  },

  updateScope() {
    return mutationOptions({
      mutationKey: ['update-scope-member'],
      mutationFn: updateScopeMemberService,
      onSuccess: invalidateMemberCache,
    })
  },

  updateStatus() {
    return mutationOptions({
      mutationKey: ['update-status-member'],
      mutationFn: updateStatusMemberService,
      onSuccess: invalidateMemberCache,
    })
  },

  updateRole() {
    return mutationOptions({
      mutationKey: ['update-role-member'],
      mutationFn: updateRoleMemberService,
      onSuccess: invalidateMemberCache,
    })
  },
}
