import { Icon, IconButton, Menu, Portal } from '@chakra-ui/react'
import { useNavigate } from '@tanstack/react-router'
import { Settings } from 'lucide-react'

import { contentCss, menuItemCss } from '@/theme/styles/global-styles'

const MenuSettings = () => {
  const navigate = useNavigate()

  return (
    <Menu.Root positioning={{ placement: 'bottom-end' }}>
      <Menu.Trigger asChild>
        <IconButton variant="ghost" size="sm" rounded="full">
          <Icon as={Settings} boxSize="5" />
        </IconButton>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content css={contentCss}>
            <Menu.Item
              value="profiel"
              css={menuItemCss}
              onClick={() => navigate({ to: '/profile' })}
            >
              Perfil
            </Menu.Item>
            <Menu.Item
              value="settings"
              css={menuItemCss}
              onClick={() => navigate({ to: '/' })}
            >
              Configurações
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}

export default MenuSettings
