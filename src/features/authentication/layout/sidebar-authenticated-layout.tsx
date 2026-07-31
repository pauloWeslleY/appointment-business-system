import { For } from '@chakra-ui/react'

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
    activePathSidebarAuthenticated,
    handleNavigationSidebarAuthenticated,
  } = useSidebarAuthenticated()

  return (
    <Sidebar.Root>
      <Sidebar.Aside>
        <For each={loadMenuSidebarAuthenticated}>
          {(item) => (
            <Sidebar.Nav
              key={item.path}
              icon={item.icon}
              active={activePathSidebarAuthenticated(item.path)}
              onClick={() => handleNavigationSidebarAuthenticated(item.path)}
            >
              {item.label}
            </Sidebar.Nav>
          )}
        </For>
      </Sidebar.Aside>

      <Sidebar.Content>
        <Sidebar.Header />

        <Sidebar.Body>{children}</Sidebar.Body>
      </Sidebar.Content>
    </Sidebar.Root>
  )
}

export default SideBarAuthenticatedLayout
