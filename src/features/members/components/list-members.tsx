import { Alert, Box, For, SimpleGrid, Skeleton } from '@chakra-ui/react'

import SearchPage from '@/components/search-page'

import { useListMembers } from '../hooks/use-list-members'
import ItemListMember from './item-list-member'
import SidebarUpdateMember from './sidebar-update-member'

const ListMembers = () => {
  const {
    selectedMember,
    isSidebarOpen,
    isLoadingMembers,
    hasExistingMembers,
    listFilteredMembers,
    setIsSidebarOpen,
    handleSelectMemberAndSidebarOpen,
  } = useListMembers()

  return (
    <Box spaceY={{ base: '4', lg: '6' }}>
      <SearchPage />

      {isLoadingMembers && <Skeleton height="40px" rounded="xl" />}

      {!hasExistingMembers && (
        <Alert.Root rounded="lg" variant="subtle">
          <Alert.Indicator />
          <Alert.Title>Não há membros cadastrados.</Alert.Title>
        </Alert.Root>
      )}

      {hasExistingMembers && (
        <SimpleGrid columns={{ base: 1, md: 2, xl: 3, '2xl': 4 }} gap="2">
          <For each={listFilteredMembers}>
            {(member) => (
              <ItemListMember
                key={member.user.id}
                member={member}
                onSidebarOpen={() =>
                  handleSelectMemberAndSidebarOpen(member.id)
                }
              />
            )}
          </For>
        </SimpleGrid>
      )}

      <SidebarUpdateMember
        isOpen={isSidebarOpen}
        member={selectedMember}
        onOpen={setIsSidebarOpen}
      />
    </Box>
  )
}

export default ListMembers
