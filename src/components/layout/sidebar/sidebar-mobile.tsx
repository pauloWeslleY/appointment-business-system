import {
  Box,
  CloseButton,
  Drawer,
  Flex,
  For,
  Icon,
  IconButton,
  Portal,
  Separator,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Menu } from 'lucide-react'
import { useState } from 'react'

import ButtonLogout from '@/components/button-logout'
import CurrentPlan from '@/components/current-plain'
import Logotipo from '@/components/logotipo'
import CardHeaderEstablishmentDetail from '@/features/establishment/components/card-header-establishment-detail'
import type { EstablishmentSlugApiResponse } from '@/features/establishment/types/get-establishment-api.response.type'
import type { MenuNavigationItemProps } from '@/shared/types/menu-item.type'
import { contentCss } from '@/theme/styles/global-styles'

import SidebarCurrentUser from './sidebar-current-user'
import SidebarItem from './sidebar-item'

export interface SidebarMobileProps {
  establishment?: EstablishmentSlugApiResponse
  menu: MenuNavigationItemProps[]
  activePath: (path?: string) => boolean
  onNavigate: (path?: string) => void
}

const SidebarMobile = ({
  establishment,
  menu,
  activePath,
  onNavigate,
}: SidebarMobileProps) => {
  const [open, setOpen] = useState(false)

  return (
    <Drawer.Root
      placement="start"
      size="xs"
      open={open}
      onOpenChange={(details) => setOpen(details.open)}
    >
      <Drawer.Trigger asChild>
        <IconButton
          rounded="xl"
          variant="ghost"
          size="sm"
          aria-label="Menu"
          display={{ base: 'inline-flex', lg: 'none' }}
          flexShrink="0"
        >
          <Icon as={Menu} boxSize="5" />
        </IconButton>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content css={contentCss} bg="sidebar.aside.bg">
            <Drawer.Header
              flexShrink="0"
              px="4"
              py="5"
              pr="10"
              borderBottomWidth="1px"
              borderColor="border.muted"
            >
              <Drawer.Title srOnly>Menu de navegação</Drawer.Title>
              <Logotipo
                variant="horizontal"
                w="full"
                h="14"
                objectFit="contain"
                objectPosition="left"
              />
            </Drawer.Header>
            <Drawer.Body
              display="flex"
              flexDirection="column"
              minH="0"
              gap="6"
              p="4"
              pb="calc(env(safe-area-inset-bottom, 0px) + 16px)"
            >
              {establishment && (
                <CardHeaderEstablishmentDetail
                  establishment={establishment}
                  mt="0"
                />
              )}

              <Box w="full" flex="1" flexShrink="0">
                <Flex
                  as="nav"
                  direction="column"
                  fontSize="sm"
                  aria-label="Main Navigation"
                  mt="2"
                  gap="1"
                >
                  <For each={menu}>
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
                          expanded
                          icon={item.icon}
                          active={activePath(item.path)}
                          onClick={() => {
                            onNavigate(item.path)
                            setOpen(false)
                          }}
                        >
                          {item.label}
                        </SidebarItem>
                      )
                    }}
                  </For>
                </Flex>
              </Box>

              <Stack
                as="footer"
                mt="auto"
                gap="4"
                w="full"
                flexShrink="0"
                pt="4"
                borderTopWidth="1px"
                borderColor="border.muted"
              >
                <CurrentPlan expanded onNavigate={() => setOpen(false)} />
                <Separator borderColor="border.muted" />
                <SidebarCurrentUser expanded />
                <ButtonLogout expanded />
              </Stack>
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
