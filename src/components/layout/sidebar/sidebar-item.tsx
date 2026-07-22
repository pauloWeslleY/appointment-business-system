import {
  chakra,
  defineRecipe,
  type HTMLChakraProps,
  Icon,
  type RecipeVariantProps,
} from '@chakra-ui/react'

import { useMenuCollapse } from '@/shared/store/menu-collapse'

const baseSidebarNavItemRecipe = defineRecipe({
  className: 'sidebar-nav-item',
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '4',
    px: '4',
    py: '2',
    rounded: 'xl',
    cursor: 'pointer',
    fontWeight: 'normal',
    letterSpacing: 'wider',
  },
})

type SidebarNavItemVariantProps = RecipeVariantProps<
  typeof baseSidebarNavItemRecipe
>

type SidebarNavItemProps = HTMLChakraProps<'button', SidebarNavItemVariantProps>

type SidebarItemProps = SidebarNavItemProps & {
  icon?: React.ElementType
  children: React.ReactNode
  active?: boolean
}

const SideBarNav = chakra('button', baseSidebarNavItemRecipe)

const SidebarItem = ({ icon, children, active, ...rest }: SidebarItemProps) => {
  const { collapsed } = useMenuCollapse()

  return (
    <SideBarNav
      {...rest}
      className="group"
      justifyContent={!collapsed ? 'flex-start' : 'center'}
      shadow={{
        base: active ? 'shape' : 'none',
        _dark: active
          ? `0 0 0 1px rgba(161, 239, 228, 0.12),
            0 6px 20px rgba(161, 239, 228, 0.18)`
          : 'none',
      }}
      transition="backgrounds"
      bg={{
        base: active ? 'colorPalette.muted' : 'transparent',
        _dark: active ? 'colorPalette.focusRing/40' : 'transparent',
      }}
      color={{
        base: active ? 'colorPalette.950' : 'colorPalette.800',
        _dark: active ? 'colorPalette.300' : 'colorPalette.200',
      }}
      _hover={{
        bg: { base: 'colorPalette.200', _dark: 'colorPalette.fg/90' },
        color: { base: 'colorPalette.900', _dark: 'colorPalette.800' },
      }}
    >
      {icon && (
        <Icon
          boxSize="4"
          _groupHover={{
            color: { base: 'colorPalette.900', _dark: 'colorPalette.800' },
          }}
          as={icon}
        />
      )}

      {!collapsed && children}
    </SideBarNav>
  )
}

export default SidebarItem
