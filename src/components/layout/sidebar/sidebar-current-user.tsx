import { Avatar, HStack, Stack, Text } from '@chakra-ui/react'

import { useMemberContext } from '@/features/members/hooks/use-member-context'
import { mapLabelMemberRole } from '@/features/members/types/member-role.type'
import { useAccountImage } from '@/shared/hooks/use-account-image'
import { useMenuCollapse } from '@/shared/store/menu-collapse'

const SidebarCurrentUser = () => {
  const { collapsed } = useMenuCollapse()
  const member = useMemberContext()
  const userImage = useAccountImage()

  return (
    <Stack
      flexDir="column"
      align={collapsed ? 'center' : 'flex-start'}
      justify={collapsed ? 'center' : 'flex-start'}
      px={collapsed ? '8' : '2'}
      w="full"
      gap="4"
    >
      <HStack gap={!collapsed ? '4' : '0'}>
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
            >
              {mapLabelMemberRole(member.role).label}
            </Text>
          </div>
        )}
      </HStack>
    </Stack>
  )
}

export default SidebarCurrentUser
