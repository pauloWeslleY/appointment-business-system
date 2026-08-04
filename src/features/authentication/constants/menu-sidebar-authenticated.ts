import { HomeIcon, UserCog, UserSquare2 } from 'lucide-react'

import type { MenuNavigationItemProps } from '@/shared/types/menu-item.type'

export const loadMenuSidebarAuthenticated: MenuNavigationItemProps[] = [
  {
    type: 'header',
    label: 'Menu',
    path: undefined,
  },
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
