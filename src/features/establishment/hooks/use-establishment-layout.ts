import { useLocation, useNavigate, useParams } from '@tanstack/react-router'
import { useMemo } from 'react'

import useGetEstablishmentById from '../hooks/use-get-establishment-by-id'

export function useEstablishmentLayout() {
  const { establishmentId } = useParams({
    from: '/dashboard/$establishmentId',
  })

  const { pathname } = useLocation()
  const { data: establishment } = useGetEstablishmentById(establishmentId)
  const navigate = useNavigate()

  const validateUrlEstablishmentLayout =
    pathname === `/dashboard/${establishmentId}`

  const loadEstablishmentInfo = useMemo(() => {
    const erroMessage = 'Sem horário de funcionamento'

    if (!establishment) {
      return {
        establishment: 'Sem estabelecimento',
        openingHours: erroMessage,
      }
    }

    const dateCurrency = new Date()
    const dayOfWeek = dateCurrency.toLocaleDateString('pt-BR', {
      weekday: 'short',
    })

    const filteredOpeningHours = establishment.openingHours.filter(
      (item) => item.day === dateCurrency.getDay(),
    )

    if (filteredOpeningHours.length === 0) {
      return {
        establishment: establishment.name,
        openingHours: erroMessage,
      }
    }

    const intervals = filteredOpeningHours.map((item) => item.intervals).flat()
    const hoursOpening = intervals.map(
      (item) => `${item.open} ás ${item.close}`,
    )

    return {
      establishment: establishment?.name,
      openingHours: `Horário de funcionamento: ${dayOfWeek.toUpperCase()} ${hoursOpening.join(', ')}`,
    }
  }, [establishment])

  const handleNavigation = (path?: string) => {
    if (path?.includes('$establishmentId') && establishmentId) {
      navigate({ to: path, params: { establishmentId } })
      return
    }

    navigate({ to: path })
  }

  const activePath = (path?: string) => {
    if (path?.includes('$establishmentId') && establishmentId) {
      const resolvedPath = path.replace('$establishmentId', establishmentId)
      return pathname === resolvedPath
    }

    return pathname === path
  }

  return {
    establishmentId,
    loadEstablishmentInfo,
    validateUrlEstablishmentLayout,
    activePath,
    handleNavigation,
  }
}
