import z from 'zod'

import { BadRequestError } from '@/shared/errors'
import { httpDependencies } from '@/shared/factory/http-dependencies'
import { HttpMethod } from '@/shared/protocols'

import {
  ConnectGoogleCalendarApiRequestSchema,
  ConnectGoogleCalendarApiResponseSchema,
} from '../schemas/connect-google-calendar.api.schema'
import { ConnectionGoogleCalendarApiResponseSchema } from '../schemas/get-connection-google-calendar-api.response.schema'
import type {
  ConnectGoogleCalendarApiRequest,
  ConnectGoogleCalendarApiResponse,
} from '../types/connectar-google-calendar-api.type'
import type { ConnectionGoogleCalendarApiResponse } from '../types/connection-google-calendar-api.response.type'

export async function connectGoogleCalendar(
  data: ConnectGoogleCalendarApiRequest,
): Promise<ConnectGoogleCalendarApiResponse> {
  const { api, validate } = httpDependencies<ConnectGoogleCalendarApiResponse>()
  const response = await api.request({
    method: HttpMethod.POST,
    url: `/admin/establishments/${data.establishmentId}/google-calendar/connect`,
    body: ConnectGoogleCalendarApiRequestSchema.omit({
      establishmentId: true,
    }).parse({
      inviteCustomers: data.inviteCustomers,
      calendarId: data.calendarId,
    }),
  })

  const validatedResponse = ConnectGoogleCalendarApiResponseSchema.safeParse(
    validate.errors(response),
  )

  if (!validatedResponse.success) {
    throw new BadRequestError(z.prettifyError(validatedResponse.error))
  }

  return validatedResponse.data
}

export async function disconnectGoogleCalendar(id: string): Promise<void> {
  const establishmentId = z.string().trim().min(1, 'ID é obrigatório').parse(id)
  const { api, validate } = httpDependencies<void>()
  const response = await api.request({
    method: HttpMethod.DELETE,
    url: `/admin/establishments/${establishmentId}/google-calendar`,
  })

  return validate.errors(response)
}

export async function getConnectionGoogleCalendar(
  id: string,
): Promise<ConnectionGoogleCalendarApiResponse> {
  const establishmentId = z.string().trim().min(1, 'ID é obrigatório').parse(id)
  const { api, validate } =
    httpDependencies<ConnectionGoogleCalendarApiResponse>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: `/admin/establishments/${establishmentId}/google-calendar`,
  })

  const validatedResponse = ConnectionGoogleCalendarApiResponseSchema.safeParse(
    validate.errors(response),
  )

  if (!validatedResponse.success) {
    throw new BadRequestError(z.prettifyError(validatedResponse.error))
  }

  return validatedResponse.data
}
