import {
  CalendarIcon,
  ChevronLeftIcon,
  HomeIcon,
  SettingsIcon,
  StarIcon,
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
    icon: ChevronLeftIcon,
    label: 'Voltar',
    path: '/establishment',
  },
]
