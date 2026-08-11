import {
  BriefcaseBusiness,
  CalendarIcon,
  ChevronLeftIcon,
  HomeIcon,
  StarIcon,
  UserCog,
  UsersRound,
} from 'lucide-react'

import type { MenuNavigationItemProps } from '@/shared/types/menu-item.type'

export const loadMenuDashboardEstablishment: MenuNavigationItemProps[] = [
  {
    type: 'header',
    label: 'Menu ',
    path: undefined,
  },
  {
    icon: HomeIcon,
    label: 'Dashsboard',
    path: '/dashboard/$slug/overview',
  },
  {
    icon: BriefcaseBusiness,
    label: 'Serviços',
    path: '/dashboard/$slug/services',
  },
  {
    icon: CalendarIcon,
    label: 'Agendamentos',
    path: '/dashboard/$slug/bookings',
  },
  {
    icon: StarIcon,
    label: 'Avaliações',
    path: '/dashboard/$slug/reviews',
  },
  {
    icon: UserCog,
    label: 'Colaboradores',
    path: '/dashboard/$slug/collaborators',
  },
  {
    icon: UsersRound,
    label: 'Clientes',
    path: '/dashboard/$slug/customers',
  },
  {
    icon: ChevronLeftIcon,
    label: 'Voltar',
    path: '/establishment',
  },
]
