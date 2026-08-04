import { mutationOptions } from '@tanstack/react-query'

import {
  createBookingService,
  updateBookingService,
  updateStatusBookingService,
} from '../services/booking.service'

export const bookingMutationOptions = {
  create() {
    return mutationOptions({
      mutationKey: ['create-booking'],
      mutationFn: createBookingService,
    })
  },

  update() {
    return mutationOptions({
      mutationKey: ['update-booking'],
      mutationFn: updateBookingService,
    })
  },

  status() {
    return mutationOptions({
      mutationKey: ['update-status-booking'],
      mutationFn: updateStatusBookingService,
    })
  },
}
