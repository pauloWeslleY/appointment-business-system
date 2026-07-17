import { For } from '@chakra-ui/react'
import { useLocation, useNavigate } from '@tanstack/react-router'

import Sidebar from '@/components/layout/sidebar'
import { useGetOwnerById } from '@/features/owner/hooks/use-get-owner-by-id'

import { loadMenuSidebarAuthenticated } from '../constants/menu-sidebar-authenticated'

interface SideBarAuthenticatedLayoutProps {
  children: React.ReactNode
}

const SideBarAuthenticatedLayout = ({
  children,
}: SideBarAuthenticatedLayoutProps) => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { data: owner } = useGetOwnerById()

  const handleNavigation = (path?: string) => {
    if (path?.includes('$ownerId') && owner) {
      navigate({ to: path, params: { ownerId: owner.id } })
      return
    }

    navigate({ to: path })
  }

  const activePath = (path?: string) => {
    if (path?.includes('$ownerId') && owner) {
      const resolvedPath = path.replace('$ownerId', owner.id)
      return pathname === resolvedPath
    }

    return pathname === path
  }

  return (
    <Sidebar.Root>
      <Sidebar.Aside>
        <For each={loadMenuSidebarAuthenticated}>
          {(item) => (
            <Sidebar.Nav
              key={item.path}
              icon={item.icon}
              active={activePath(item.path)}
              onClick={() => handleNavigation(item.path)}
            >
              {item.label}
            </Sidebar.Nav>
          )}
        </For>
      </Sidebar.Aside>

      <Sidebar.Content overflowY="auto">
        <Sidebar.Header />

        <Sidebar.Body>{children}</Sidebar.Body>
      </Sidebar.Content>
    </Sidebar.Root>
  )
}

export default SideBarAuthenticatedLayout
