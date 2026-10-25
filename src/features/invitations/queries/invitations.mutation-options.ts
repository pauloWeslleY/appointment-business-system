import { mutationOptions } from '@tanstack/react-query'

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
      onSuccess: async (_data, _variables, _result, { client }) => {
        await Promise.all([
          client.invalidateQueries({ queryKey: invitationQueryKey.all }),
          client.invalidateQueries({ queryKey: memberQueryKey.all }),
          client.invalidateQueries({ queryKey: memberQueryKey.meContext }),
        ])
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
