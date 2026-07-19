import { mutationOptions } from '@tanstack/react-query'

import {
  createAppointmentService,
  updateAppointmentService,
  updateStatusAppointmentService,
} from '../api/appointment.service'

export const appointmentMutationOptions = {
  create() {
    return mutationOptions({
      mutationKey: ['create-appointment'],
      mutationFn: createAppointmentService,
    })
  },

  update() {
    return mutationOptions({
      mutationKey: ['update-appointment'],
      mutationFn: updateAppointmentService,
    })
  },

  status() {
    return mutationOptions({
      mutationKey: ['update-status-appointment'],
      mutationFn: updateStatusAppointmentService,
    })
  },
}
