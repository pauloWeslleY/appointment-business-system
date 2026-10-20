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
    py: '2.5',
    rounded: 'lg',
    cursor: 'pointer',
    fontWeight: 'normal',
    letterSpacing: 'wider',
    transition: 'backgrounds',
    bg: 'sidebar.item.bg',
    color: 'sidebar.item.color',
    _hover: {
      bg: 'sidebar.item.hover.bg',
      color: 'sidebar.item.hover.fg',
    },
  },
  variants: {
    collapsed: {
      open: {
        justifyContent: 'flex-start',
      },
      closed: {
        justifyContent: 'center',
      },
    },

    active: {
      true: {
        shadow: '2xs',
        bg: 'sidebar.item.active.bg',
        color: 'sidebar.item.active.fg',
      },
      false: {},
    },
  },

  defaultVariants: {
    active: false,
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
      collapsed={!collapsed ? 'open' : 'closed'}
      active={active}
    >
      {icon && (
        <Icon
          boxSize="5"
          _groupHover={{ color: 'sidebar.item.hover.fg' }}
          as={icon}
        />
      )}

      {!collapsed && children}
    </SideBarNav>
  )
}

export default SidebarItem
