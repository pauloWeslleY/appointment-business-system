import { mutationOptions } from '@tanstack/react-query'

import { authenticationQueryKey } from '@/features/authentication/queries/authentication.query-key'
import { memberQueryKey } from '@/features/members/queries/member.query-key'

import {
  acceptInvitationService,
  cancelInvitationService,
  sendInvitationService,
} from '../services/invitations.service'
import { invitationQueryKey } from './invitations.query-key'

export const invitationsMutationOptions = {
  accept() {
    return mutationOptions({
      mutationKey: ['accept-invitation'],
      mutationFn: acceptInvitationService,
      onSuccess: async (_data, _variables, _result, context) => {
        const queryKeysMembers = [
          authenticationQueryKey.all,
          invitationQueryKey.all,
          memberQueryKey.all,
        ] as const

        await Promise.all(
          queryKeysMembers.map((queryKey) =>
            context.client.invalidateQueries({ queryKey }),
          ),
        )
      },
    })
  },

  send() {
    return mutationOptions({
      mutationKey: ['send-invitation'],
      mutationFn: sendInvitationService,
      onSuccess: (_data, _variables, _result, { client }) =>
        client.invalidateQueries({ queryKey: invitationQueryKey.lists() }),
    })
  },

  cancel() {
    return mutationOptions({
      mutationKey: ['cancel-invitation'],
      mutationFn: cancelInvitationService,
      onSuccess: (_data, _variables, _result, { client }) =>
        client.invalidateQueries({ queryKey: invitationQueryKey.all }),
    })
  },
}
