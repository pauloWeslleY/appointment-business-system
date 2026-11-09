import type z from 'zod'

import type {
  AppointmentPageApiRequestSchema,
  AppointmentPageApiResponseSchema,
} from '../schemas/appointment-page-api.schema'
import type { GetAppointmentByEstablishmentModel } from './get-appointment-by-establishment.model'

export type AppointmentPageApiRequest = z.infer<
  typeof AppointmentPageApiRequestSchema
>
export type AppointmentPageApiResponse = z.infer<
  typeof AppointmentPageApiResponseSchema
>
export type AppointmentPageModel = Omit<
  AppointmentPageApiResponse,
  'appointments'
> & {
  appointments: GetAppointmentByEstablishmentModel[]
}
