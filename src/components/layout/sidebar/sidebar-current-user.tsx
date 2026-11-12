import { Avatar, HStack, Icon, IconButton, Stack, Text } from '@chakra-ui/react'
import { LogOutIcon } from 'lucide-react'

import { Tooltip } from '@/components/ui/tooltip'
import { useMemberContext } from '@/features/members/hooks/use-member-context'
import { mapLabelMemberRole } from '@/features/members/types/member-role.type'
import { useAccountImage } from '@/shared/hooks/use-account-image'
import { useLogout } from '@/shared/hooks/use-logout'
import { useMenuCollapse } from '@/shared/store/menu-collapse'

interface SidebarCurrentUserProps {
  expanded?: boolean
}

const SidebarCurrentUser = ({ expanded = false }: SidebarCurrentUserProps) => {
  const { handleLogout } = useLogout()
  const menu = useMenuCollapse()
  const member = useMemberContext()
  const userImage = useAccountImage()
  const collapsed = !expanded && menu.collapsed

  return (
    <Stack
      flexDir="column"
      align={collapsed ? 'center' : 'flex-start'}
      justify={collapsed ? 'center' : 'flex-start'}
      px={collapsed ? '8' : '2'}
      w="full"
      gap="4"
    >
      <Stack
        w={!collapsed ? 'full' : 'auto'}
        direction={collapsed ? 'column' : 'row'}
        gap={collapsed ? '4' : '0'}
        justify={collapsed ? 'center' : 'space-between'}
      >
        <HStack align="center" gap="2">
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

          {!collapsed && member && (
            <div>
              <Text
                lineHeight="1"
                fontSize="sm"
                fontWeight="light"
                textTransform="capitalize"
                color={{ _light: 'secondary.500', _dark: 'secondary.300' }}
              >
                {member.user.name}
              </Text>
              <Text
                fontSize="sm"
                fontWeight="light"
                color={{ _light: 'gray.500', _dark: 'gray.300' }}
                lineHeight="shorter"
              >
                {mapLabelMemberRole(member.role).label}
              </Text>
            </div>
          )}
        </HStack>

        <Tooltip content="Sair" showArrow>
          <IconButton
            aria-label="Logout"
            rounded="full"
            variant="ghost"
            colorPalette="primary"
            size="xs"
            onClick={handleLogout}
            display={{ base: 'none', lg: 'inline-flex' }}
          >
            <Icon as={LogOutIcon} boxSize="4" />
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  )
}

export default SidebarCurrentUser
