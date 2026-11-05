import { CreditCard } from 'lucide-react'
import { useMemo } from 'react'

import { RESOURCES } from '@/shared/constants/permission'
import { usePermissions } from '@/shared/hooks/use-permissions'
import type { MenuNavigationItemProps } from '@/shared/types/menu-item.type'

import { loadMenuSidebarAuthenticated } from '../constants/menu-sidebar-authenticated'

export function useMenuSidebarAuthenticated() {
  const { invitations, subscriptions } = usePermissions([
    RESOURCES.INVITATION,
    RESOURCES.SUBSCRIPTION,
  ])

  const menuSidebarAuthenticated = useMemo(() => {
    return loadMenuSidebarAuthenticated.reduce<MenuNavigationItemProps[]>(
      (menu, item, index, items) => {
        const canShowItem =
          item.label !== 'Equipe e acessos' || invitations.canCreate

        if (canShowItem) {
          menu.push(item)
        }

        if (subscriptions.canRead && index === items.length - 1) {
          menu.push(
            {
              type: 'header',
              label: 'Planos',
              path: undefined,
            },
            {
              icon: CreditCard,
              label: 'Assinatura',
              path: '/subscription',
            },
          )
        }

        return menu
      },
      [],
    )
  }, [invitations.canCreate, subscriptions.canRead])

  return { menuSidebarAuthenticated }
}
