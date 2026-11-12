import {
  Button,
  defineStyle,
  For,
  Icon,
  Menu,
  Portal,
  useMediaQuery,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from 'lucide-react'
import type { ElementType } from 'react'

import { contentCss } from '@/theme/styles/global-styles'

import { type ColorMode, useColorMode } from '../ui/color-mode'

const MenuTheme = () => {
  const { colorMode, setColorMode } = useColorMode()
  const [isLargerThan800] = useMediaQuery(['(min-width: 600px)'])
  console.log(isLargerThan800)

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
          <Icon as={currentItem.icon} boxSize={isLargerThan800 ? '4' : '5'} />
          {isLargerThan800 && currentItem.label}
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content css={contentCss} shadow="md" spaceY="1.5">
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
                <Menu.Item
                  value={item.value}
                  {...getMenuThemeItemBg(colorMode === item.value)}
                >
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

function getMenuThemeItemBg(itemSelected: boolean) {
  return defineStyle({
    rounded: 'lg',
    cursor: 'pointer',
    ...(itemSelected && {
      bg: { _light: 'navy.100', _dark: 'navy.600/30' },
      outlineStyle: 'solid',
      outlineWidth: '2px',
      outlineColor: { _light: 'navy.200', _dark: 'navy.800' },
    }),
    _hover: {
      bg: { _light: 'gray.100', _dark: 'secondary.600' },
      outlineStyle: 'solid',
      outlineWidth: '2px',
      outlineColor: { _light: 'gray.200', _dark: 'secondary.500' },
    },
  })
}
