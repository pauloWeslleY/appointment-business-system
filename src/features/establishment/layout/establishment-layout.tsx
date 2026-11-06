import {
  Box,
  Flex,
  For,
  HStack,
  Separator,
  Skeleton,
  Text,
} from '@chakra-ui/react'
import { Navigate } from '@tanstack/react-router'
import { type ReactNode } from 'react'

import Sidebar from '@/components/layout/sidebar'
import { Status } from '@/components/ui/status'

import CardHeaderEstablishmentDetail from '../components/card-header-establishment-detail'
import SelectEstablishmentsByOrganization from '../components/select-establishments-by-organization'
import { loadMenuDashboardEstablishment } from '../constants/menu-dashboard-establishment'
import { useEstablishmentLayout } from '../hooks/use-establishment-layout'
import {
  mapStatusColorEstablishment,
  mapStatusEstablishment,
} from '../types/establishment-status.type'
import type { EstablishmentSlugApiResponse } from '../types/get-establishment-api.response.type'
import { establishmentThemeStyle } from '../utils/establishment-theme'

interface EstablishmentLayoutProps {
  establishment: EstablishmentSlugApiResponse
  organizationId: string
  children: ReactNode
}

const EstablishmentLayout = ({
  children,
  establishment,
  organizationId,
}: EstablishmentLayoutProps) => {
  const {
    colorMode,
    collapsed,
    isEstablishmentRootPath,
    isLoadingEstablishmentLayout,
    activePathEstablishmentLayout,
    handleNavigationEstablishmentLayout,
  } = useEstablishmentLayout(establishment)
  const statusEstablishmentMap = mapStatusEstablishment(establishment.status)

  if (isEstablishmentRootPath) {
    return (
      <Navigate
        to="/dashboard/$slug/overview"
        params={{ slug: establishment.slug }}
      />
    )
  }

  return (
    <Sidebar.Root style={establishmentThemeStyle(establishment, colorMode)}>
      <Sidebar.Aside>
        <For each={loadMenuDashboardEstablishment}>
          {(item) => {
            if (item.type === 'header') {
              return (
                <Sidebar.NavTitle
                  key={item.label}
                  collapsed={collapsed ? 'closed' : 'open'}
                >
                  {item.label}
                </Sidebar.NavTitle>
              )
            }

            return (
              <Sidebar.Nav
                key={item.path}
                icon={item.icon}
                active={activePathEstablishmentLayout(item.path)}
                onClick={() => handleNavigationEstablishmentLayout(item.path)}
              >
                {item.label}
              </Sidebar.Nav>
            )
          }}
        </For>
      </Sidebar.Aside>

      <Sidebar.Content>
        <Sidebar.Header
          select={
            <SelectEstablishmentsByOrganization
              organizationId={organizationId}
            />
          }
          navigation={{
            menu: loadMenuDashboardEstablishment,
            activePath: activePathEstablishmentLayout,
            onNavigate: handleNavigationEstablishmentLayout,
          }}
        >
          {isLoadingEstablishmentLayout && (
            <Skeleton h="40px" w="500px" rounded="lg" />
          )}

          {!isLoadingEstablishmentLayout && (
            <Flex align="center" gap="4" minW="0" flexWrap="wrap">
              <CardHeaderEstablishmentDetail establishment={establishment} />

              <Separator
                h="8"
                orientation="vertical"
                borderColor={{ _light: 'gray.200', _dark: 'gray.500' }}
              />

              <HStack>
                <Text fontSize="sm">Status:</Text>

                <Status
                  value={mapStatusColorEstablishment[establishment.status]}
                >
                  {statusEstablishmentMap.label}
                </Status>
              </HStack>
            </Flex>
          )}
        </Sidebar.Header>

        <Sidebar.Body>
          <Box
            w="full"
            minW="0"
            maxW="breakpoint-2xl"
            mx={{ base: 0, xl: 'auto' }}
          >
            {children}
          </Box>
        </Sidebar.Body>
      </Sidebar.Content>
    </Sidebar.Root>
  )
}

export default EstablishmentLayout
