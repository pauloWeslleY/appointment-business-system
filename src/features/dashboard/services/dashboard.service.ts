import z from 'zod'

import { BadRequestError } from '@/shared/errors'
import { httpDependencies } from '@/shared/factory/http-dependencies'
import { HttpMethod } from '@/shared/protocols'

import { DashboardQueryApiRequestSchema } from '../schemas/dashboard-query.api.schema'
import { DailyAppointmentsDashboardApiResponseSchema } from '../schemas/get-daily-appointments-dashboard.api.schema'
import { ReconciliationDashboardApiResponseSchema } from '../schemas/get-reconciliation-dashboard.api.schema'
import { RevenueDashboardApiResponseSchema } from '../schemas/get-revenue-dashboard.api.schema'
import { StatsDashboardApiResponseSchema } from '../schemas/get-stats-dashboard.api.schema'
import { TopClientsAppointmentsDashboardApiResponseSchema } from '../schemas/get-top-clients-appointments-dashboard.api.schema'
import { TopServicesDashboardApiResponseSchema } from '../schemas/get-top-services-dashboard.api.schema'
import type { DashboardQueryApiRequest } from '../types/dashboard-query.api.type'
import type { DailyAppointmentsDashboardApiResponse } from '../types/get-daily-appointments-dashboard.api.type'
import type { ReconciliationDashboardApiResponse } from '../types/get-reconciliation-dashboard.api.type'
import type { RevenueDashboardApiResponse } from '../types/get-revenue-dashboard.api.type'
import type { StatsDashboardApiResponse } from '../types/get-stats-dashboard.api.type'
import type { TopClientsAppointmentsDashboardApiResponse } from '../types/get-top-clients-appointments-dashboard.api.type'
import type { TopServicesDashboardApiResponse } from '../types/get-top-services-dashboard.api.type'

export async function getStatsDashboard(
  input: DashboardQueryApiRequest,
): Promise<StatsDashboardApiResponse> {
  const { api, validate } = httpDependencies<StatsDashboardApiResponse>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: '/dashboard/establishment/stats',
    params: DashboardQueryApiRequestSchema.parse(input),
  })

  const validatedResponse = StatsDashboardApiResponseSchema.safeParse(
    validate.errors(response),
  )

  if (!validatedResponse.success) {
    throw new BadRequestError(z.prettifyError(validatedResponse.error))
  }

  return validatedResponse.data
}

export async function getRevenueDashboard(
  input: DashboardQueryApiRequest,
): Promise<RevenueDashboardApiResponse> {
  const { api, validate } = httpDependencies<RevenueDashboardApiResponse>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: '/dashboard/establishment/revenue',
    params: DashboardQueryApiRequestSchema.parse(input),
  })

  const validatedResponse = RevenueDashboardApiResponseSchema.safeParse(
    validate.errors(response),
  )

  if (!validatedResponse.success) {
    throw new BadRequestError(z.prettifyError(validatedResponse.error))
  }

  return validatedResponse.data
}

export async function getDailyAppointmentsDashboard(
  input: DashboardQueryApiRequest,
): Promise<DailyAppointmentsDashboardApiResponse> {
  const { api, validate } =
    httpDependencies<DailyAppointmentsDashboardApiResponse>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: '/dashboard/establishment/daily/appointments',
    params: DashboardQueryApiRequestSchema.parse(input),
  })

  const validatedResponse =
    DailyAppointmentsDashboardApiResponseSchema.safeParse(
      validate.errors(response),
    )

  if (!validatedResponse.success) {
    throw new BadRequestError(z.prettifyError(validatedResponse.error))
  }

  return validatedResponse.data
}

export async function getTopServicesDashboard(
  input: DashboardQueryApiRequest,
): Promise<TopServicesDashboardApiResponse> {
  const { api, validate } = httpDependencies<TopServicesDashboardApiResponse>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: '/dashboard/establishment/top/services',
    params: DashboardQueryApiRequestSchema.parse(input),
  })

  const validatedResponse = TopServicesDashboardApiResponseSchema.safeParse(
    validate.errors(response),
  )

  if (!validatedResponse.success) {
    throw new BadRequestError(z.prettifyError(validatedResponse.error))
  }

  return validatedResponse.data
}

export async function getTopClientsAppointmentsDashboard(
  input: DashboardQueryApiRequest,
): Promise<TopClientsAppointmentsDashboardApiResponse> {
  const { api, validate } =
    httpDependencies<TopClientsAppointmentsDashboardApiResponse>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: '/dashboard/establishment/top/clients/appointments',
    params: DashboardQueryApiRequestSchema.parse(input),
  })

  const validatedResponse =
    TopClientsAppointmentsDashboardApiResponseSchema.safeParse(
      validate.errors(response),
    )

  if (!validatedResponse.success) {
    throw new BadRequestError(z.prettifyError(validatedResponse.error))
  }

  return validatedResponse.data
}

export async function getReconciliationDashboard(
  input: DashboardQueryApiRequest,
): Promise<ReconciliationDashboardApiResponse> {
  const { api, validate } =
    httpDependencies<ReconciliationDashboardApiResponse>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: '/dashboard/establishment/reconciliation',
    params: DashboardQueryApiRequestSchema.parse(input),
  })

  const validatedResponse = ReconciliationDashboardApiResponseSchema.safeParse(
    validate.errors(response),
  )

  if (!validatedResponse.success) {
    throw new BadRequestError(z.prettifyError(validatedResponse.error))
  }

  return validatedResponse.data
}
