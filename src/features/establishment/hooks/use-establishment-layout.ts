import { useLocation, useNavigate, useParams } from '@tanstack/react-router'
import { useMemo } from 'react'

import { useMenuCollapse } from '@/shared/store/menu-collapse'

import useGetEstablishmentById from '../hooks/use-get-establishment-by-id'
import { validateOpeningHoursEstablishment } from '../utils/validate-opening-hours-establishment'

export function useEstablishmentLayout() {
  const { establishmentId } = useParams({ from: '/dashboard/$establishmentId' })
  const { pathname } = useLocation()
  const { collapsed } = useMenuCollapse()
  const { data: establishment } = useGetEstablishmentById(establishmentId)
  const navigate = useNavigate()

  const validateUrlEstablishmentLayout =
    pathname === `/dashboard/${establishmentId}`

  const loadEstablishmentInfo = useMemo<{
    establishmentOpen: boolean
    openingHours: string
  }>(() => validateOpeningHoursEstablishment(establishment), [establishment])

  const handleNavigation = (path?: string) => {
    if (!path?.includes('$establishmentId')) {
      navigate({ to: path })
      return
    }

    navigate({ to: path, params: { establishmentId } })
  }

  const activePath = (path?: string) => {
    if (path?.includes('$establishmentId')) {
      const resolvedPath = path.replace('/dashboard/$establishmentId', '')
      return pathname.includes(resolvedPath)
    }

    return pathname.includes(path ?? '')
  }

  return {
    collapsed,
    establishment,
    establishmentId,
    loadEstablishmentInfo,
    validateUrlEstablishmentLayout,
    activePath,
    handleNavigation,
  }
}
