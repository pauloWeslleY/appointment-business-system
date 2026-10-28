import {
  Alert,
  Card,
  Flex,
  For,
  Separator,
  SimpleGrid,
  Skeleton,
} from '@chakra-ui/react'

import SearchPage from '@/components/search-page'
import { cardSectionCss } from '@/theme/styles/global-styles'

import { useListMembers } from '../hooks/use-list-members'
import ItemListMember from './item-list-member'

const ListMembers = () => {
  const { isLoadingMembers, listFilteredMembers, hasExistingMembers } =
    useListMembers()

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

        <SearchPage />
      </Flex>

      <Separator borderColor={{ _light: 'slate.200', _dark: 'slate.900' }} />

      {isLoadingMembers && <Skeleton height="40px" rounded="xl" />}

      {!hasExistingMembers && (
        <Alert.Root rounded="lg" variant="subtle">
          <Alert.Indicator />
          <Alert.Title>Não há membros cadastrados.</Alert.Title>
        </Alert.Root>
      )}

      {hasExistingMembers && (
        <SimpleGrid columns={{ base: 1, md: 4 }} gap="2">
          <For each={listFilteredMembers}>
            {(member) => (
              <ItemListMember key={member?.user.id} member={member} />
            )}
          </For>
        </SimpleGrid>
      )}
    </Card.Root>
  )
}

export default ListMembers
