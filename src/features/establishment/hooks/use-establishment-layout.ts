import { useIsFetching } from '@tanstack/react-query'
import { useLocation, useNavigate } from '@tanstack/react-router'

import { useColorMode } from '@/components/ui/color-mode'
import { useMenuCollapse } from '@/shared/store/menu-collapse'

import { establishmentQueryKeys } from '../queries/establishment.query-key'
import type { EstablishmentSlugApiResponse } from '../types/get-establishment-api.response.type'

export function useEstablishmentLayout(
  establishment: EstablishmentSlugApiResponse,
) {
  const { colorMode } = useColorMode()
  const { pathname } = useLocation()
  const { collapsed } = useMenuCollapse()
  const navigate = useNavigate()
  const isFetching = useIsFetching({
    queryKey: establishmentQueryKeys.adminSlug(establishment.slug),
  })
  const isLoadingEstablishmentLayout = isFetching > 0

  const isEstablishmentRootPath =
    pathname === `/dashboard/${establishment.slug}`

  const handleNavigationEstablishmentLayout = (path?: string) => {
    if (!path?.includes('$slug')) {
      navigate({ to: path })
      return
    }

    navigate({ to: path, params: { slug: establishment.slug } })
  }

  const activePathEstablishmentLayout = (path?: string) => {
    if (path?.includes('$slug')) {
      const resolvedPath = path.replace('/dashboard/$slug', '')
      return pathname.includes(resolvedPath)
    }

    return pathname.includes(path ?? '')
  }

  return {
    colorMode,
    collapsed,
    isEstablishmentRootPath,
    isLoadingEstablishmentLayout,
    activePathEstablishmentLayout,
    handleNavigationEstablishmentLayout,
  }
}
