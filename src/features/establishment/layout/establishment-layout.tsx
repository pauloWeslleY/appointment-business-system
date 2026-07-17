import { For, Text } from '@chakra-ui/react'
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from '@tanstack/react-router'
import type { ReactNode } from 'react'

import Sidebar from '@/components/layout/sidebar'

import { loadMenuDashboardEstablishment } from '../constants/menu-dashboard-establishment'
import useGetEstablishmentById from '../hooks/use-get-establishment-by-id'

interface EstablishmentLayoutProps {
  children: ReactNode
}

const EstablishmentLayout = ({ children }: EstablishmentLayoutProps) => {
  const { establishmentId } = useParams({
    from: '/dashboard/$establishmentId',
  })
  const { pathname } = useLocation()
  const { data: establishment } = useGetEstablishmentById(establishmentId)
  const navigate = useNavigate()

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

        <Sidebar.Body>{children}</Sidebar.Body>
      </Sidebar.Content>
    </Sidebar.Root>
  )
}

export default EstablishmentLayout
