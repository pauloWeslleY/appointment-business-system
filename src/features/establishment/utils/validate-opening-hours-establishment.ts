import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

import type { EstablishmentOrganizationProfileApiResponse } from '../types/get-establishment-api.response.type'

dayjs.extend(utc)
dayjs.extend(timezone)

const getEstablishmentCurrentDate = (establishmentTimezone: string) => {
  try {
    return dayjs().tz(establishmentTimezone)
  } catch {
    return null
  }
}

export const validateOpeningHoursEstablishment = (
  establishment?: Pick<
    EstablishmentOrganizationProfileApiResponse,
    'openingHours' | 'timezone'
  >,
) => {
  const erroMessage = 'Sem horário de funcionamento'

  if (!establishment) {
    return {
      establishmentOpen: false,
      openingHours: erroMessage,
    }
  }

  const establishmentCurrentDate = getEstablishmentCurrentDate(
    establishment.timezone,
  )

  if (!establishmentCurrentDate) {
    return {
      establishmentOpen: false,
      openingHours: 'Fuso horário do estabelecimento inválido',
    }
  }

  const dayOfWeek = establishmentCurrentDate
    .toDate()
    .toLocaleDateString('pt-BR', {
      weekday: 'long',
      timeZone: establishment.timezone,
    })

  const filteredOpeningHours = establishment.openingHours.filter(
    (item) => item.day === establishmentCurrentDate.day(),
  )

  if (filteredOpeningHours.length === 0) {
    return {
      establishmentOpen: false,
      openingHours: erroMessage,
    }
  }

  const intervals = filteredOpeningHours.map((item) => item.intervals).flat()
  const hoursOpening = intervals.map((item) => `${item.open} ás ${item.close}`)
  const timeNow = establishmentCurrentDate.format('HH:mm')
  const establishmentOpen =
    timeNow >= intervals[0].open && timeNow <= intervals[0].close
  const dayOfWeekFormatted =
    dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1)
  const openingHours = `${dayOfWeekFormatted} das ${hoursOpening.join(', ')}`

  return {
    establishmentOpen,
    openingHours,
  }
}
