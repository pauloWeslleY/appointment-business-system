import { mutationOptions } from '@tanstack/react-query'

import {
  connectGoogleCalendar,
  disconnectGoogleCalendar,
} from '../services/google-calendar.service'

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
    })
  },
}
