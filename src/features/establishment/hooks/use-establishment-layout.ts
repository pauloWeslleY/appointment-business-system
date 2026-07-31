import { useLocation, useNavigate, useParams } from '@tanstack/react-router'
import { useMemo } from 'react'

import useGetEstablishmentById from '../hooks/use-get-establishment-by-id'
import { validateOpeningHoursEstablishment } from '../utils/validate-opening-hours-establishment'

export function useEstablishmentLayout() {
  const { establishmentId } = useParams({
    from: '/dashboard/$establishmentId',
  })

  const { pathname } = useLocation()
  const { data: establishment } = useGetEstablishmentById(establishmentId)
  const navigate = useNavigate()

  const validateUrlEstablishmentLayout =
    pathname === `/dashboard/${establishmentId}`

  const loadEstablishmentInfo = useMemo(
    () => validateOpeningHoursEstablishment(establishment),
    [establishment],
  )

  const handleNavigation = (path?: string) => {
    if (path?.includes('$establishmentId') && establishmentId) {
      navigate({ to: path, params: { establishmentId } })
      return
    }

    navigate({ to: path })
  }

  const activePath = (path?: string) => {
    if (path?.includes('$establishmentId')) {
      const resolvedPath = path.replace('/dashboard/$establishmentId', '')
      return pathname.includes(resolvedPath)
    }

    return pathname.includes(path ?? '')
  }

  return {
    establishment,
    establishmentId,
    loadEstablishmentInfo,
    validateUrlEstablishmentLayout,
    activePath,
    handleNavigation,
  }
}
