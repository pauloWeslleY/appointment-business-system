import { Badge, Box, For, HStack, Separator, Text } from '@chakra-ui/react'
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
    collapsed,
    establishment,
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
          {(item) => {
            if (item.type === 'header') {
              return (
                <Text
                  key={item.label}
                  display={collapsed ? 'none' : 'block'}
                  fontSize="sm"
                  fontWeight="medium"
                  letterSpacing="wider"
                  color={{ base: 'gray.500', _dark: 'gray.400' }}
                  my="4"
                  pl="2"
                >
                  {item.label}
                </Text>
              )
            }

            return (
              <Sidebar.Nav
                key={item.path}
                icon={item.icon}
                active={activePath(item.path)}
                onClick={() => handleNavigation(item.path)}
              >
                {item.label}
              </Sidebar.Nav>
            )
          }}
        </For>
      </Sidebar.Aside>

      <Sidebar.Content>
        <Sidebar.Header>
          <Box spaceY="1" mt="1">
            <Text as="h2" lineHeight="1">
              {establishment?.name ?? 'Carregando...'}
            </Text>

            <HStack align="center">
              <Text
                lineHeight="1"
                fontSize="sm"
                letterSpacing="wide"
                fontWeight="light"
                color={{ base: 'primary.500', _dark: 'emerald.300/50' }}
              >
                {loadEstablishmentInfo.openingHours}
              </Text>

              <Separator
                h="4"
                orientation="vertical"
                borderColor={{ base: 'gray.200', _dark: 'gray.500' }}
              />

              <Badge
                size="sm"
                colorPalette={
                  loadEstablishmentInfo.establishmentOpen ? 'green' : 'red'
                }
              >
                {loadEstablishmentInfo.establishmentOpen ? 'Aberto' : 'Fechado'}
              </Badge>
            </HStack>
          </Box>
        </Sidebar.Header>

        <Sidebar.Body>{children}</Sidebar.Body>
      </Sidebar.Content>
    </Sidebar.Root>
  )
}

export default EstablishmentLayout
