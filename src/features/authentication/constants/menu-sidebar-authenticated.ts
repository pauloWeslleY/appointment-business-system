import {
  Building2,
  CreditCard,
  UserCog,
  UserSquare2,
  UsersRound,
} from 'lucide-react'

import type { MenuNavigationItemProps } from '@/shared/types/menu-item.type'

export const loadMenuSidebarAuthenticated: MenuNavigationItemProps[] = [
  {
    type: 'header',
    label: 'Menu',
    path: undefined,
  },
  {
    icon: Building2,
    label: 'Organizações',
    path: '/organization',
  },
  {
    icon: UserSquare2,
    label: 'Perfil empresarial',
    path: '/business-profile',
  },
  {
    icon: UsersRound,
    label: 'Membros',
    path: '/members',
  },
  {
    icon: UserCog,
    label: 'Conta',
    path: '/profile',
  },
  {
    type: 'header',
    label: 'Planos',
    path: undefined,
  },
  {
    icon: CreditCard,
    label: 'Assinatura',
    path: '/assinatura',
  },
]
