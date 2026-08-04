import { Box, For, Text } from '@chakra-ui/react'
import React from 'react'

import Sidebar from '@/components/layout/sidebar'

import { loadMenuSidebarAuthenticated } from '../constants/menu-sidebar-authenticated'
import { useSidebarAuthenticated } from '../hooks/use-sidebar-authenticated'

interface SideBarAuthenticatedLayoutProps {
  children: React.ReactNode
}

const SideBarAuthenticatedLayout = ({
  children,
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
        <For each={loadMenuSidebarAuthenticated}>
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
        <Sidebar.Header>
          <Box>
            <Text fontSize="md">{welcomeMessage}</Text>
            <Text fontSize="sm" color={{ base: 'gray.300', _dark: 'gray.500' }}>
              {today}
            </Text>
          </Box>
        </Sidebar.Header>

        <Sidebar.Body>{children}</Sidebar.Body>
      </Sidebar.Content>
    </Sidebar.Root>
  )
}

export default SideBarAuthenticatedLayout
