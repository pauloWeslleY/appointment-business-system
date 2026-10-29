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
  const mapColor = member.role === MemberRoles.OWNER ? 'blue' : 'gray'

  return (
    <HStack
      {...rest}
      pl="2"
      pr="1"
      py="2.5"
      rounded="md"
      bg={{ _light: 'slate.200/10', _dark: 'slate.800/20' }}
      borderLeft="5px solid"
      borderColor={{ _light: `${mapColor}.500`, _dark: `${mapColor}.400` }}
    >
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
            color={{ _light: 'slate.800', _dark: 'slate.300' }}
          >
            {member.user.name}
          </Text>

          <Badge size="sm" variant="surface" colorPalette={mapColor}>
            {role.label}
          </Badge>
        </div>
      </Flex>

      <IconButton
        colorPalette="brand"
        rounded="xl"
        variant="ghost"
        size="xs"
        onClick={onSidebarOpen}
      >
        <Icon as={EllipsisVertical} />
      </IconButton>
    </HStack>
  )
}

export default ItemListMember
