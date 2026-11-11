import { Box, For, Skeleton } from '@chakra-ui/react'
import { Navigate } from '@tanstack/react-router'
import { type ReactNode } from 'react'

import Sidebar from '@/components/layout/sidebar'

import CardHeaderEstablishmentDetail from '../components/card-header-establishment-detail'
import SelectEstablishmentsByOrganization from '../components/select-establishments-by-organization'
import { loadMenuDashboardEstablishment } from '../constants/menu-dashboard-establishment'
import { useEstablishmentLayout } from '../hooks/use-establishment-layout'
import type { EstablishmentSlugApiResponse } from '../types/get-establishment-api.response.type'

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
    collapsed,
    isEstablishmentRootPath,
    isLoadingEstablishmentLayout,
    activePathEstablishmentLayout,
    handleNavigationEstablishmentLayout,
  } = useEstablishmentLayout(establishment)

  if (isEstablishmentRootPath) {
    return (
      <Navigate
        to="/dashboard/$slug/overview"
        params={{ slug: establishment.slug }}
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
            <CardHeaderEstablishmentDetail establishment={establishment} />
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
