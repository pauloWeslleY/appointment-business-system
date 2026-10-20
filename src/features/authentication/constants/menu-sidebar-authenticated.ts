import { Building2, CreditCard, Store, UserCog, UsersRound } from 'lucide-react'

import type { MenuNavigationItemProps } from '@/shared/types/menu-item.type'

export const loadMenuSidebarAuthenticated: MenuNavigationItemProps[] = [
  {
    type: 'header',
    label: 'Menu',
    path: undefined,
  },
  {
    icon: Store,
    label: 'Estabelecimento',
    path: '/establishment',
  },
  {
    icon: Building2,
    label: 'Perfil empresarial',
    path: '/organization',
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
