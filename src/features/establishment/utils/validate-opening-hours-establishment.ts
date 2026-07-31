import dayjs from 'dayjs'

import type { EstablishmentModel } from '../types/establishment.model'

export const validateOpeningHoursEstablishment = (
  establishment?: EstablishmentModel,
) => {
  const erroMessage = 'Sem horário de funcionamento'

  if (!establishment) {
    return {
      establishmentOpen: false,
      openingHours: erroMessage,
    }
  }

  const dateCurrency = dayjs()
  const today = dateCurrency.toDate()
  const dayOfWeek = today.toLocaleDateString('pt-BR', { weekday: 'short' })

  const filteredOpeningHours = establishment.openingHours.filter(
    (item) => item.day === today.getDay(),
  )

  if (filteredOpeningHours.length === 0) {
    return {
      establishmentOpen: false,
      openingHours: erroMessage,
    }
  }

  const intervals = filteredOpeningHours.map((item) => item.intervals).flat()
  const hoursOpening = intervals.map((item) => `${item.open} ás ${item.close}`)
  const timeNow = dateCurrency.format('HH:mm')
  const establishmentOpen =
    timeNow >= intervals[0].open && timeNow <= intervals[0].close
  const openingHours = `Horário de funcionamento: ${dayOfWeek.toUpperCase()} ${hoursOpening.join(', ')}`

  return {
    establishmentOpen,
    openingHours,
  }
}
