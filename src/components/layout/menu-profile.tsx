import {
  Avatar,
  Box,
  Flex,
  HStack,
  Icon,
  Menu,
  Portal,
  Skeleton,
  Text,
} from '@chakra-ui/react'
import { Link } from '@tanstack/react-router'
import { ChevronDown, LockIcon, LogOut, UserKeyIcon } from 'lucide-react'

import { useMemberContext } from '@/features/members/hooks/use-member-context'
import { mapLabelMemberRole } from '@/features/members/types/member-role.type'
import { MenuAccount } from '@/features/users/constants/menu-account'
import { useAccountImage } from '@/shared/hooks/use-account-image'
import { useLogout } from '@/shared/hooks/use-logout'
import { contentCss, menuItemCss } from '@/theme/styles/global-styles'

const MenuProfile = () => {
  const { handleLogout } = useLogout()
  const member = useMemberContext()
  const userImage = useAccountImage()

  if (!member) {
    return <Skeleton h="40px" w="28" rounded="2xl" />
  }

  return (
    <Menu.Root positioning={{ placement: 'bottom-start' }}>
      <Menu.Trigger asChild>
        <Flex
          as="button"
          aria-label="Menu do perfil"
          cursor="pointer"
          display="flex"
          align="center"
          gap="4"
          py="1"
          px="2"
        >
          <HStack align="center">
            <Avatar.Root
              shape="full"
              size="xs"
              borderWidth="1px"
              borderColor="colorPalette.500"
              bg={{ _light: 'colorPalette.100', _dark: 'colorPalette.700/40' }}
              color={{ _light: 'colorPalette.400', _dark: 'colorPalette.500' }}
            >
              {userImage && <Avatar.Image src={userImage} />}
              <Avatar.Fallback />
            </Avatar.Root>

            <Box
              display={{ base: 'none', xl: 'block' }}
              maxW="40"
              textAlign="left"
              fontSize="sm"
              overflowWrap="anywhere"
            >
              <Text
                lineHeight="1"
                fontWeight="light"
                color={{ _light: 'secondary.500', _dark: 'secondary.300' }}
                textTransform="capitalize"
              >
                {member.user.name}
              </Text>
              <Text
                fontWeight="light"
                color={{ _light: 'gray.500', _dark: 'gray.300' }}
              >
                {mapLabelMemberRole(member.role).label}
              </Text>
            </Box>
          </HStack>

          <Icon
            as={ChevronDown}
            boxSize="4"
            color={{ _light: 'gray.500', _dark: 'gray.300' }}
          />
        </Flex>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content css={contentCss} shadow="md">
            <Menu.Item
              asChild
              value={MenuAccount.PERMISSIONS}
              css={menuItemCss}
            >
              <Link to="/account" search={{ menu: MenuAccount.PERMISSIONS }}>
                <Icon as={UserKeyIcon} boxSize="4" />
                Minhas Permissões
              </Link>
            </Menu.Item>

            <Menu.Item
              asChild
              value={MenuAccount.CHANGE_PASSWORD}
              css={menuItemCss}
            >
              <Link
                to="/account"
                search={{ menu: MenuAccount.CHANGE_PASSWORD }}
              >
                <Icon as={LockIcon} boxSize="4" />
                Alterar senha
              </Link>
            </Menu.Item>

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
