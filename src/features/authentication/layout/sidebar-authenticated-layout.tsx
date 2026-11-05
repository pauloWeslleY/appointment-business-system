import { Box, For, Text } from '@chakra-ui/react'
import React from 'react'

import Sidebar from '@/components/layout/sidebar'
import type { MenuNavigationItemProps } from '@/shared/types/menu-item.type'

import { useSidebarAuthenticated } from '../hooks/use-sidebar-authenticated'

interface SideBarAuthenticatedLayoutProps {
  children: React.ReactNode
  menu: MenuNavigationItemProps[]
}

const SideBarAuthenticatedLayout = ({
  children,
  menu,
}: SideBarAuthenticatedLayoutProps) => {
  const {
    today,
    collapsed,
    welcomeMessage,
    activePathSidebarAuthenticated,
    handleNavigationSidebarAuthenticated,
  } = useSidebarAuthenticated()

  return (
    <Sidebar.Root>
      <Sidebar.Aside>
        <For each={menu}>
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
                active={activePathSidebarAuthenticated(item.path)}
                onClick={() => handleNavigationSidebarAuthenticated(item.path)}
              >
                {item.label}
              </Sidebar.Nav>
            )
          }}
        </For>
      </Sidebar.Aside>

      <Sidebar.Content>
        <Sidebar.Header
          navigation={{
            menu,
            activePath: activePathSidebarAuthenticated,
            onNavigate: handleNavigationSidebarAuthenticated,
          }}
        >
          <Box minW="0" overflowWrap="anywhere">
            <Text fontSize="md">{welcomeMessage}</Text>
            <Text
              fontSize="sm"
              color={{ _light: 'gray.400', _dark: 'gray.500' }}
            >
              {today}
            </Text>
          </Box>
        </Sidebar.Header>

        <Sidebar.Body>
          <Box
            maxW={{ base: 'auto', xl: 'breakpoint-2xl' }}
            mx={{ base: '0', xl: 'auto' }}
          >
            {children}
          </Box>
        </Sidebar.Body>
      </Sidebar.Content>
    </Sidebar.Root>
  )
}

export default SideBarAuthenticatedLayout
