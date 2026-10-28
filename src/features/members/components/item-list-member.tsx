import { Avatar, Badge, HStack, Text } from '@chakra-ui/react'
import type { Member } from 'better-auth/client/plugins'

import {
  mapLabelMemberRole,
  type MemberRoleType,
} from '../types/member-role.type'

interface ItemListMemberProps {
  member: Member & {
    user: {
      id: string
      email: string
      name: string
      image?: string | undefined
    }
  }
}

const ItemListMember = ({ member }: ItemListMemberProps) => {
  const role = mapLabelMemberRole(member.role as MemberRoleType)

  return (
    <HStack>
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

        <Badge size="sm" variant="subtle" colorPalette={role.color}>
          {role.label}
        </Badge>
      </div>
    </HStack>
  )
}

export default ItemListMember
