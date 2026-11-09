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
import { EllipsisVertical } from 'lucide-react'

import type { MemberType } from '@/shared/types/auth-client.type'

import {
  mapLabelMemberRole,
  MemberRoles,
  type MemberRoleType,
} from '../types/member-role.type'

interface ItemListMemberProps extends StackProps {
  onSidebarOpen: () => void
  member: MemberType
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
      <Flex align="center" gap="2" flex="1" minW="0">
        <Avatar.Root size="sm">
          {member.user.image && (
            <Avatar.Image src={member.user.image} alt={member.user.name} />
          )}
          <Avatar.Fallback />
        </Avatar.Root>

        <div style={{ minWidth: 0 }}>
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
        aria-label={`Editar membro ${member.user.name}`}
        flexShrink="0"
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
