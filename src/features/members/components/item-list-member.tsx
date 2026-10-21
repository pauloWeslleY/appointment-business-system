import { Avatar, Box, HStack, Stack, Text } from '@chakra-ui/react'
import type { Member } from 'better-auth/client/plugins'

import { MemberRoles } from '../types/member-role.type'

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
  return (
    <HStack>
      <Stack>
        <Avatar.Root size="sm">
          <Avatar.Image src={member.user.image} alt={member.user.name} />
        </Avatar.Root>

        <Box>
          <Text
            fontSize="md"
            fontWeight="bold"
            letterSpacing="wide"
            color={{ _light: 'slate.500', _dark: 'slate.300' }}
          >
            {member.user.name}
          </Text>
          <Text fontSize="xs">
            {member.role === MemberRoles.OWNER
              ? 'Proprietário da empresa'
              : 'Member'}
          </Text>
        </Box>
      </Stack>
    </HStack>
  )
}

export default ItemListMember
