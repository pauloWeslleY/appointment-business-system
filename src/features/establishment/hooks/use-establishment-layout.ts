import { useLocation, useNavigate } from '@tanstack/react-router'
import { useMemo } from 'react'

import { useMenuCollapse } from '@/shared/store/menu-collapse'

import type { EstablishmentSlugModel } from '../types/establishment.model'
import { validateOpeningHoursEstablishment } from '../utils/validate-opening-hours-establishment'

export function useEstablishmentLayout(establishment: EstablishmentSlugModel) {
  const { pathname } = useLocation()
  const { collapsed } = useMenuCollapse()
  const navigate = useNavigate()

  const validateUrlEstablishmentLayout =
    pathname === `/dashboard/${establishment.slug}`

  const loadEstablishmentInfo = useMemo<{
    establishmentOpen: boolean
    openingHours: string
  }>(() => validateOpeningHoursEstablishment(establishment), [establishment])

  const handleNavigation = (path?: string) => {
    if (!path?.includes('$slug')) {
      navigate({ to: path })
      return
    }

    navigate({ to: path, params: { slug: establishment.slug } })
  }

  const activePath = (path?: string) => {
    if (path?.includes('$slug')) {
      const resolvedPath = path.replace('/dashboard/$slug', '')
      return pathname.includes(resolvedPath)
    }

    return pathname.includes(path ?? '')
  }

  return {
    collapsed,
    loadEstablishmentInfo,
    validateUrlEstablishmentLayout,
    activePath,
    handleNavigation,
  }
}
