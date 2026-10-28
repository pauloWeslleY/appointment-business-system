import {
  Avatar,
  Badge,
  Flex,
  HStack,
  Icon,
  IconButton,
  type StackProps,
  Text,
} from '@chakra-ui/react'
import type { Member } from 'better-auth/client/plugins'
import { EllipsisVertical } from 'lucide-react'

import {
  mapLabelMemberRole,
  MemberRoles,
  type MemberRoleType,
} from '../types/member-role.type'

interface ItemListMemberProps extends StackProps {
  onSidebarOpen: () => void
  member: Member & {
    user: {
      id: string
      email: string
      name: string
      image?: string | undefined
    }
  }
}

const ItemListMember = ({
  member,
  onSidebarOpen,
  ...rest
}: ItemListMemberProps) => {
  const role = mapLabelMemberRole(member.role as MemberRoleType)

  return (
    <HStack {...rest}>
      <Flex align="center" gap="2" flex="1">
        <Avatar.Root size="sm">
          <Avatar.Image src={member.user.image} alt={member.user.name} />
          <Avatar.Fallback />
        </Avatar.Root>

        <div>
          <Text
            truncate
            fontSize="md"
            fontWeight="medium"
            letterSpacing="wide"
            lineHeight="shorter"
            color={{ _light: 'slate.500', _dark: 'slate.300' }}
          >
            {member.user.name}
          </Text>

          <Badge
            size="sm"
            variant="surface"
            colorPalette={member.role === MemberRoles.OWNER ? 'blue' : 'gray'}
          >
            {role.label}
          </Badge>
        </div>
      </Flex>

      <IconButton
        colorPalette="gray"
        rounded="xl"
        variant="outline"
        size="xs"
        onClick={onSidebarOpen}
      >
        <Icon as={EllipsisVertical} />
      </IconButton>
    </HStack>
  )
}

export default ItemListMember
