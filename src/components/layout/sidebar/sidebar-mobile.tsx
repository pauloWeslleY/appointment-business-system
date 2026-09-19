import {
  Box,
  CloseButton,
  Drawer,
  Flex,
  For,
  Icon,
  IconButton,
  Image,
  Portal,
  Separator,
  Text,
} from '@chakra-ui/react'
import { useLocation, useNavigate } from '@tanstack/react-router'
import { Menu } from 'lucide-react'
import { useMemo } from 'react'

import ButtonLogout from '@/components/button-logout'
import { loadMenuSidebarAuthenticated } from '@/features/authentication/constants/menu-sidebar-authenticated'
import { loadMenuDashboardEstablishment } from '@/features/establishment/constants/menu-dashboard-establishment'
import type { MenuNavigationItemProps } from '@/shared/types/menu-item.type'
import { contentCss } from '@/theme/styles/global-styles'

import CardUserInfo from '../card-user-info'
import SidebarItem from './sidebar-item'

const SidebarMobile = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const loadMenu = useMemo<MenuNavigationItemProps[]>(() => {
    const pathAuthenticated = new Set(['/establishment', '/owner', '/profile'])
    const validatePath = pathAuthenticated.has(pathname)
    return validatePath
      ? loadMenuSidebarAuthenticated
      : loadMenuDashboardEstablishment
  }, [pathname])

  return (
    <Drawer.Root placement="start" size="lg">
      <Drawer.Trigger asChild>
        <IconButton
          rounded="xl"
          variant="ghost"
          size="sm"
          aria-label="Menu"
          display={{ base: 'inline-flex', md: 'none' }}
        >
          <Icon as={Menu} boxSize="5" />
        </IconButton>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content css={contentCss}>
            <Drawer.Body
              spaceY="2"
              h="full"
              display="flex"
              flexDirection="column"
            >
              <Box w="full" spaceY="2" flex="1">
                <Flex pt="4" align="center" gap="2">
                  <Image
                    src="/appointly-symbol.svg"
                    alt="Appointly Logo"
                    boxSize="10"
                  />

                  <div>
                    <Text
                      fontFamily="heading"
                      fontSize="lg"
                      fontWeight="semibold"
                      color={{
                        base: 'colorPalette.600',
                        _dark: 'colorPalette.400',
                      }}
                    >
                      Appointly
                    </Text>
                    <Text
                      fontFamily="heading"
                      fontSize="xs"
                      color={{ base: 'gray.400', _dark: 'gray.600' }}
                      fontWeight="semibold"
                    >
                      Booking System
                    </Text>
                  </div>
                </Flex>

                <Separator
                  borderColor={{
                    base: 'gray.700',
                    _dark: 'colorPalette.800/60',
                  }}
                />

                <Flex
                  as="nav"
                  direction="column"
                  fontSize="sm"
                  aria-label="Main Navigation"
                  mt="2"
                  gap="1"
                >
                  <For each={loadMenu}>
                    {(item) => {
                      if (item.type === 'header') {
                        return (
                          <Text
                            key={item.label}
                            display="block"
                            fontSize="sm"
                            fontWeight="medium"
                            letterSpacing="wider"
                            color={{ base: 'gray.500', _dark: 'gray.400' }}
                            my="4"
                            pl="2"
                          >
                            {item.label}
                          </Text>
                        )
                      }

                      return (
                        <SidebarItem
                          key={item.path}
                          icon={item.icon}
                          active={pathname.includes(item.path ?? '')}
                          onClick={() => navigate({ to: item.path })}
                        >
                          {item.label}
                        </SidebarItem>
                      )
                    }}
                  </For>
                </Flex>
              </Box>

              <Flex
                flexDir="column"
                gap="4"
                w="full"
                py="4"
                align="center"
                justify="center"
                px="4"
                rounded="xl"
                shadow="xs"
                bg={{ base: 'tertiary.800', _dark: 'secondary.900' }}
                borderWidth="1px"
                borderColor={{ base: 'gray.600', _dark: 'secondary.500/20' }}
              >
                <CardUserInfo />

                <ButtonLogout />
              </Flex>
            </Drawer.Body>

            <Drawer.CloseTrigger asChild>
              <CloseButton size="xs" rounded="full" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}

export default SidebarMobile
