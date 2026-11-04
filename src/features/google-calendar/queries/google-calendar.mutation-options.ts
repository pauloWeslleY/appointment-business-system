import { mutationOptions } from '@tanstack/react-query'

import {
  connectGoogleCalendar,
  disconnectGoogleCalendar,
} from '../services/google-calendar.service'
import { googleCalendarQueryKeys } from './google-calendar.query-key'

export const googleCalendarMutationOptions = {
  connect: () => {
    return mutationOptions({
      mutationKey: ['connect-google-calendar'],
      mutationFn: connectGoogleCalendar,
    })
  },

  disconnect: () => {
    return mutationOptions({
      mutationKey: ['disconnect-google-calendar'],
      mutationFn: disconnectGoogleCalendar,
      onSuccess: async (_, establishmentId, _result, context) => {
        await context.client.invalidateQueries({
          queryKey: googleCalendarQueryKeys.connection(establishmentId),
        })
      },
    })
  },
}
