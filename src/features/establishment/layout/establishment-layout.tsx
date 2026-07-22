import { Box, For, Text } from '@chakra-ui/react'
import { Navigate } from '@tanstack/react-router'
import { type ReactNode } from 'react'

import Sidebar from '@/components/layout/sidebar'

import { loadMenuDashboardEstablishment } from '../constants/menu-dashboard-establishment'
import { useEstablishmentLayout } from '../hooks/use-establishment-layout'

interface EstablishmentLayoutProps {
  children: ReactNode
}

const EstablishmentLayout = ({ children }: EstablishmentLayoutProps) => {
  const {
    establishmentId,
    loadEstablishmentInfo,
    validateUrlEstablishmentLayout,
    activePath,
    handleNavigation,
  } = useEstablishmentLayout()

  if (validateUrlEstablishmentLayout) {
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
          <Box spaceY="1">
            <Text as="h2" lineHeight="shorter">
              {loadEstablishmentInfo.establishment}
            </Text>

            <Text
              as="h2"
              fontSize="xs"
              lineHeight="1"
              color={{ base: 'colorPalette.700', _dark: 'colorPalette.500' }}
            >
              {loadEstablishmentInfo.openingHours}
            </Text>
          </Box>
        </Sidebar.Header>

        <Sidebar.Body>{children}</Sidebar.Body>
      </Sidebar.Content>
    </Sidebar.Root>
  )
}

export default EstablishmentLayout
