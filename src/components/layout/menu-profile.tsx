import {
  Avatar,
  Box,
  Flex,
  HStack,
  Icon,
  Menu,
  Portal,
  Text,
} from '@chakra-ui/react'
import { ChevronDown, LogOut } from 'lucide-react'

import { authClient } from '@/lib/auth'
import { useStorageImage } from '@/shared/hooks/use-get-storage-image'
import { useLogout } from '@/shared/hooks/use-logout'
import { contentCss, menuItemCss } from '@/theme/styles/global-styles'

const MenuProfile = () => {
  const { data } = authClient.useSession()
  const { data: storageData } = useStorageImage(data?.user?.image)
  const { handleLogout } = useLogout()

  return (
    <Menu.Root positioning={{ placement: 'bottom-start' }}>
      <Menu.Trigger asChild>
        <Flex
          cursor="pointer"
          display={{ base: 'none', md: 'flex' }}
          align="center"
          gap="4"
          py="1"
          px="2"
          shadow="xs"
          rounded="full"
          borderWidth="1px"
          borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
        >
          <HStack align="center">
            <Avatar.Root
              shape="full"
              size="xs"
              borderWidth="1px"
              borderColor="colorPalette.500"
              bg={{ base: 'colorPalette.100', _dark: 'colorPalette.700/40' }}
              color={{ base: 'colorPalette.400', _dark: 'colorPalette.500' }}
            >
              <Avatar.Fallback />
              <Avatar.Image src={storageData ?? ''} />
            </Avatar.Root>

            <Box textAlign="left" fontSize="sm">
              <Text
                lineHeight="1"
                fontWeight="light"
                color={{ base: 'secondary.500', _dark: 'secondary.300' }}
                textTransform="capitalize"
              >
                {data?.user?.name ?? 'Usuário'}
              </Text>
              <Text
                fontWeight="light"
                color={{ base: 'gray.500', _dark: 'gray.300' }}
              >
                Admin
              </Text>
            </Box>
          </HStack>

          <Icon
            as={ChevronDown}
            boxSize="4"
            color={{ base: 'gray.500', _dark: 'gray.300' }}
          />
        </Flex>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content css={contentCss}>
            <Menu.Item value="signout" css={menuItemCss} onClick={handleLogout}>
              <Icon as={LogOut} boxSize="4" />
              Sair
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}

export default MenuProfile
