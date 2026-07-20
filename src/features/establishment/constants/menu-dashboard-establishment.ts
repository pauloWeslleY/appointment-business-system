import {
  CalendarIcon,
  ChevronLeftIcon,
  HomeIcon,
  SettingsIcon,
  StarIcon,
  UserCog,
  UsersRound,
} from 'lucide-react'

import type { MenuNavigationItemProps } from '@/shared/types/menu-item.type'

export const loadMenuDashboardEstablishment: MenuNavigationItemProps[] = [
  {
    icon: HomeIcon,
    label: 'Dashsboard',
    path: '/dashboard/$establishmentId/overview',
  },
  {
    icon: SettingsIcon,
    label: 'Serviços',
    path: '/dashboard/$establishmentId/services',
  },
  {
    icon: CalendarIcon,
    label: 'Agendamentos',
    path: '/dashboard/$establishmentId/appointments',
  },
  {
    icon: StarIcon,
    label: 'Avaliações',
    path: '/dashboard/$establishmentId/reviews',
  },
  {
    icon: UserCog,
    label: 'Colaboradores',
    path: '/dashboard/$establishmentId/collaborators',
  },
  {
    icon: UsersRound,
    label: 'Clientes',
    path: '/dashboard/$establishmentId/customers',
  },
  {
    icon: ChevronLeftIcon,
    label: 'Voltar',
    path: '/establishment',
  },
]
