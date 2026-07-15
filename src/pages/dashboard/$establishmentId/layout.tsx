import { For, Text } from '@chakra-ui/react'
import {
  createFileRoute,
  Navigate,
  Outlet,
  redirect,
  useLocation,
} from '@tanstack/react-router'

import Sidebar from '@/components/layout/sidebar'
import useGetEstablishmentById from '@/shared/hooks/use-get-establishment-by-id'

import { loadMenuDashboardEstablishment } from '../-constants/menu-dashboard-establishment'

export const Route = createFileRoute('/dashboard/$establishmentId')({
  beforeLoad: async ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: '/login' })
    }
  },
  component: DashboardPage,
})

function DashboardPage() {
  const { establishmentId } = Route.useParams()
  const { pathname } = useLocation()
  const { data: establishment } = useGetEstablishmentById(establishmentId)
  const navigate = Route.useNavigate()

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

  if (pathname === `/dashboard/${establishmentId}`) {
    return (
      <Navigate
        to="/dashboard/$establishmentId/overview"
        params={{ establishmentId }}
      />
    )
  }

  return (
    <Sidebar.Root>
      <Sidebar.Aside>
        <For each={loadMenuDashboardEstablishment}>
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
        <Sidebar.Header>
          <Text as="h2">{establishment?.name}</Text>
        </Sidebar.Header>

        <Sidebar.Body>
          <Outlet />
        </Sidebar.Body>
      </Sidebar.Content>
    </Sidebar.Root>
  )
}
