import { useLocation, useNavigate } from '@tanstack/react-router'

import { useGetOwnerById } from '@/features/owner/hooks/use-get-owner-by-id'

export function useSidebarAuthenticated() {
  const { pathname } = useLocation()
  const { data: owner } = useGetOwnerById()
  const navigate = useNavigate()

  const handleNavigationSidebarAuthenticated = (path?: string) => {
    if (path?.includes('$ownerId') && owner) {
      navigate({ to: path, params: { ownerId: owner.id } })
      return
    }

    navigate({ to: path })
  }

  const activePathSidebarAuthenticated = (path?: string) => {
    if (path?.includes('$ownerId')) {
      return pathname.includes(path.replace('$ownerId', ''))
    }

    return pathname.includes(path ?? '')
  }

  return {
    activePathSidebarAuthenticated,
    handleNavigationSidebarAuthenticated,
  }
}
