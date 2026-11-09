import { z } from 'zod'

import { AppointmentStatusSchema } from '../types/appointment-status.type'
import { AppointmentListApiRequestSchema } from './appointment-api-request.schema'
import { AppointmentListApiResponseSchema } from './appointment-api-response.schema'

export const AppointmentPageApiRequestSchema =
  AppointmentListApiRequestSchema.extend({
    page: z.number().int().min(1).max(1_000_000),
    pageSize: z.number().int().min(1).max(100),
    q: z.string().max(200).optional(),
    status: AppointmentStatusSchema.optional(),
  })

export const AppointmentPageApiResponseSchema =
  AppointmentListApiResponseSchema.extend({
    total: z.number().int().nonnegative(),
    summary: z.object({
      total: z.number().int().nonnegative(),
      byStatus: z.object({
        pending: z.number().int().nonnegative(),
        confirmed: z.number().int().nonnegative(),
        concluded: z.number().int().nonnegative(),
        cancelled: z.number().int().nonnegative(),
      }),
    }),
  })
