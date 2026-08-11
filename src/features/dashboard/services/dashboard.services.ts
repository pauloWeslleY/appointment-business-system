import { httpDependencies } from '@/shared/factory/http-dependencies'
import { HttpMethod } from '@/shared/http'

import type { DailyBookingsEstablishmentModel } from '../types/daily-bookings-establishment.model'
import type { RevenueEstablishmentModel } from '../types/revenue-establishment.model'
import type { StatsEstablishmentModel } from '../types/stats-establishment.model'
import type { TopServicesEstablishmentModel } from '../types/top-services-establishment.model'

export const getDailyBookingsEstablishmentService = async (input: {
  establishmentId: string
  from: string
  to: string
}) => {
  const { api, validate } =
    httpDependencies<DailyBookingsEstablishmentModel[]>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: '/dashboard/establishment/daily/bookings',
    params: {
      establishmentId: input.establishmentId,
      from: input.from,
      to: input.to,
    },
  })
  return validate.errors(response)
}

export const getRevenueEstablishmentService = async (input: {
  establishmentId: string
  from: string
  to: string
}) => {
  const { api, validate } = httpDependencies<RevenueEstablishmentModel[]>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: '/dashboard/establishment/revenue',
    params: {
      establishmentId: input.establishmentId,
      from: input.from,
      to: input.to,
    },
  })
  return validate.errors(response)
}

export const getStatsEstablishmentService = async (input: {
  establishmentId: string
  from: string
  to: string
}) => {
  const { api, validate } = httpDependencies<StatsEstablishmentModel>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: '/dashboard/establishment/stats',
    params: {
      establishmentId: input.establishmentId,
      from: input.from,
      to: input.to,
    },
  })
  return validate.errors(response)
}

export const getTopServicesEstablishmentService = async (input: {
  establishmentId: string
  from: string
  to: string
}) => {
  const { api, validate } = httpDependencies<TopServicesEstablishmentModel[]>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: '/dashboard/establishment/top/services',
    params: {
      establishmentId: input.establishmentId,
      from: input.from,
      to: input.to,
    },
  })
  return validate.errors(response)
}
