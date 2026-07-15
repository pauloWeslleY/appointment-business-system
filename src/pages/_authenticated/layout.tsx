import { For } from '@chakra-ui/react'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useLocation } from '@tanstack/react-router'
import { HomeIcon, UserCog, UserSquare2 } from 'lucide-react'

import Sidebar from '@/components/layout/sidebar'
import useGetOwnerById from '@/shared/hooks/use-get-owner-by-id'
import type { MenuNavigationItemProps } from '@/shared/types/menu-item.type'

export const Route = createFileRoute('/_authenticated')({
  component: AuthenticatedLayout,
})

const loadMenuAuthenticated: MenuNavigationItemProps[] = [
  {
    icon: HomeIcon,
    label: 'Estabelecimentos',
    path: '/establishment',
  },
  {
    icon: UserCog,
    label: 'Perfil',
    path: '/profile',
  },
  {
    icon: UserSquare2,
    label: 'Proprietário',
    path: '/owner/$ownerId',
  },
]

function AuthenticatedLayout() {
  const { pathname } = useLocation()
  const navigate = Route.useNavigate()
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
        <For each={loadMenuAuthenticated}>
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

        <Sidebar.Body>
          <Outlet />
        </Sidebar.Body>
      </Sidebar.Content>
    </Sidebar.Root>
  )
}
