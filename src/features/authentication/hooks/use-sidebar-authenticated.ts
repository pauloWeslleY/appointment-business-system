import { useLocation, useNavigate } from '@tanstack/react-router'
import dayjs from 'dayjs'

import { useGetOwnerById } from '@/features/owner/hooks/use-get-owner-by-id'
import { useMenuCollapse } from '@/shared/store/menu-collapse'

export function useSidebarAuthenticated() {
  const { collapsed } = useMenuCollapse()
  const { pathname } = useLocation()
  const { data: owner } = useGetOwnerById()
  const navigate = useNavigate()

  const dateCurrent = dayjs().format('dddd, D [de] MMMM')
  const welcomeMessage = `Olá, ${owner?.name ?? 'usuário'}!`
  const today = dateCurrent.charAt(0).toUpperCase() + dateCurrent.slice(1)

  const handleNavigationSidebarAuthenticated = (path?: string) => {
    navigate({ to: path })
  }

  const activePathSidebarAuthenticated = (path?: string) => {
    return pathname.includes(path ?? '')
  }

  return {
    today,
    collapsed,
    welcomeMessage,
    activePathSidebarAuthenticated,
    handleNavigationSidebarAuthenticated,
  }
}
