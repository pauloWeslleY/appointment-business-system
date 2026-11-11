import { Button, For, Icon, Menu, Portal } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from 'lucide-react'
import type { ElementType } from 'react'

import { contentCss, menuItemCss } from '@/theme/styles/global-styles'

import { type ColorMode, useColorMode } from '../ui/color-mode'

const MenuTheme = () => {
  const { colorMode, setColorMode } = useColorMode()

  const buttonIcon: Record<ColorMode, { label: string; icon: ElementType }> = {
    light: {
      label: 'Claro',
      icon: SunIcon,
    },
    dark: {
      label: 'Escuro',
      icon: MoonIcon,
    },
  } as const

  const currentItem = buttonIcon[colorMode]

  return (
    <Menu.Root
      positioning={{ placement: 'bottom-start' }}
      onSelect={(e) => setColorMode(e.value as ColorMode)}
    >
      <Menu.Trigger asChild>
        <Button rounded="lg" variant="ghost" size="sm">
          <Icon as={currentItem.icon} boxSize="4" />
          {currentItem.label}
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content css={contentCss} shadow="md">
            <For
              each={[
                {
                  label: 'Claro',
                  value: 'light',
                  icon: SunIcon,
                },
                {
                  label: 'Escuro',
                  value: 'dark',
                  icon: MoonIcon,
                },
              ]}
            >
              {(item) => (
                <Menu.Item value={item.value} css={menuItemCss}>
                  <Icon as={item.icon} boxSize="4" />
                  {item.label}
                </Menu.Item>
              )}
            </For>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}

export default MenuTheme
