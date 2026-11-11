import { For, Icon, IconButton, Menu, Portal } from '@chakra-ui/react'
import { Link, type ToOptions } from '@tanstack/react-router'
import { Settings } from 'lucide-react'
import { useMemo } from 'react'

import { RESOURCES } from '@/shared/constants/permission'
import { usePermissions } from '@/shared/hooks/use-permissions'
import { contentCss, menuItemCss } from '@/theme/styles/global-styles'

interface MenuSettingsItemProps {
  label: string
  value: string
  permission: boolean
}

const MenuSettings = () => {
  const { subscriptions } = usePermissions([RESOURCES.SUBSCRIPTION])

  const menuSettings = useMemo<MenuSettingsItemProps[]>(() => {
    const menuItems = new Set<MenuSettingsItemProps>([
      { label: 'Perfil', value: 'account', permission: true },
      { label: 'Configurações', value: 'settings', permission: true },
    ])

    const permission: MenuSettingsItemProps[] = [
      {
        label: 'Assinatura',
        value: 'subscription',
        permission: subscriptions.canRead,
      },
    ]

    return permission.reduce(
      (menu, item) => {
        if (item.permission) {
          menu.push(item)
        }

        return menu
      },
      [...Array.from(menuItems)],
    )
  }, [subscriptions.canRead])

  return (
    <Menu.Root positioning={{ placement: 'bottom-end' }}>
      <Menu.Trigger asChild>
        <IconButton
          aria-label="Opções da conta"
          variant="ghost"
          size="sm"
          rounded="full"
        >
          <Icon as={Settings} boxSize="5" />
        </IconButton>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content css={contentCss} shadow="md">
            <For each={menuSettings} fallback={null}>
              {(item) => (
                <Menu.Item asChild value={item.value} css={menuItemCss}>
                  <Link to={`/${item.value}` as ToOptions['to']}>
                    {item.label}
                  </Link>
                </Menu.Item>
              )}
            </For>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}

export default MenuSettings
