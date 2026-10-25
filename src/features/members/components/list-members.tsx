import {
  Alert,
  Card,
  Flex,
  For,
  Icon,
  Input,
  InputGroup,
  Separator,
  Skeleton,
  VStack,
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { SearchIcon } from 'lucide-react'

import { authClient } from '@/lib/auth'
import { cardSectionCss } from '@/theme/styles/global-styles'

import { listMembersQueryOptions } from '../queries/member.query-options'
import ItemListMember from './item-list-member'

const ListMembers = () => {
  const { data: session } = authClient.useSession()
  const { data: members, isLoading: isLoadingMembers } = useQuery(
    listMembersQueryOptions(session?.session.activeOrganizationId ?? undefined),
  )
  const listAllMembers = members?.data?.members ?? []

  return (
    <Card.Root
      css={cardSectionCss}
      variant="outline"
      display="flex"
      flexDir="column"
      gap="3"
    >
      <Flex align="center" justify="space-between">
        <Card.Title
          display="flex"
          alignItems="center"
          flex="1"
          gap="2"
          color={{ _light: 'sea.600', _dark: 'sea.100' }}
        >
          Membros da empresa
        </Card.Title>

        <InputGroup
          maxW="200px"
          startElement={<Icon as={SearchIcon} boxSize="5" />}
        >
          <Input placeholder="Buscar" rounded="lg" variant="subtle" />
        </InputGroup>
      </Flex>

      <Separator borderColor={{ _light: 'slate.200', _dark: 'slate.900' }} />

      {isLoadingMembers && <Skeleton height="150px" rounded="lg" />}

      {!isLoadingMembers && listAllMembers.length === 0 && (
        <Alert.Root rounded="lg" variant="subtle">
          <Alert.Indicator />
          <Alert.Title>Não há membros cadastrados.</Alert.Title>
        </Alert.Root>
      )}

      {!isLoadingMembers && listAllMembers.length !== 0 && (
        <VStack gap="2">
          <For each={listAllMembers}>
            {(member) => (
              <ItemListMember key={member?.user.id} member={member} />
            )}
          </For>
        </VStack>
      )}
    </Card.Root>
  )
}

export default ListMembers
