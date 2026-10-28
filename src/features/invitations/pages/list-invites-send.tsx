import {
  Badge,
  Box,
  Button,
  defineStyle,
  Flex,
  For,
  Skeleton,
  Stack,
  Table,
} from '@chakra-ui/react'

import SearchPage from '@/components/search-page'
import { mapLabelMemberRole } from '@/features/members/types/member-role.type'
import { formattedDateAndHours } from '@/shared/utils/formatted-date'

import DialogCancelInvite from '../components/dialog-cancel-invite'
import DialogSendInvite from '../components/dialog-send-invite'
import { useInvitationNavigation } from '../hooks/use-list-invites-send'
import {
  mapLabelInvitationStatus,
  StatusInvitations,
} from '../types/status-invitations.type'

const cssTableColumns = defineStyle({
  color: { _light: 'sea.600', _dark: 'sea.500' },
})

const ListInvitesSendPage = () => {
  const {
    openDialogCancelInvite,
    setOpenDialogCancelInvite,
    selectedInvitation,
    isLoadingInvitations,
    loadListInvitations,
    handleOpenDialogCancelInvite,
  } = useInvitationNavigation()

  if (isLoadingInvitations) {
    return (
      <Stack w="full" gap="2">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} rounded="lg" height="30px" w="full" />
        ))}
      </Stack>
    )
  }

  return (
    <Box spaceY="4">
      <Flex justify="space-between">
        <SearchPage />

        <DialogSendInvite />
      </Flex>

      <Table.ScrollArea
        rounded="lg"
        borderColor={{ _light: 'slate.200', _dark: 'slate.900/60' }}
      >
        <Table.Root variant="outline">
          <Table.Header>
            <Table.Row bg={{ _light: 'slate.200', _dark: 'slate.900/60' }}>
              <For each={['E-mail', 'Papel', 'Status', 'Data de expiração']}>
                {(column) => (
                  <Table.ColumnHeader {...cssTableColumns}>
                    {column}
                  </Table.ColumnHeader>
                )}
              </For>
              <Table.ColumnHeader textAlign="right" {...cssTableColumns}>
                Ações
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {loadListInvitations.map((invite) => {
              const mapStatus = mapLabelInvitationStatus(invite.status)
              const mapRole = mapLabelMemberRole(invite.role)
              const expireDate = formattedDateAndHours(invite.expiresAt, true)

              return (
                <Table.Row
                  key={invite.id}
                  bg={{ _light: 'slate.50', _dark: 'slate.950/60' }}
                >
                  <Table.Cell>{invite.email}</Table.Cell>
                  <Table.Cell>
                    <Badge
                      size="sm"
                      rounded="full"
                      variant="surface"
                      colorPalette="gray"
                    >
                      {mapRole.label}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge
                      size="sm"
                      rounded="lg"
                      colorPalette={mapStatus.color}
                    >
                      {mapStatus.label}
                    </Badge>
                  </Table.Cell>

                  <Table.Cell>{expireDate}</Table.Cell>

                  <Table.Cell textAlign="right">
                    {invite.status !== StatusInvitations.CANCELED && (
                      <Button
                        size="2xs"
                        rounded="lg"
                        variant="outline"
                        colorPalette="red"
                        onClick={() => handleOpenDialogCancelInvite(invite)}
                      >
                        Revogar
                      </Button>
                    )}
                  </Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>

      <DialogCancelInvite
        invite={selectedInvitation}
        open={openDialogCancelInvite}
        onOpen={setOpenDialogCancelInvite}
      />
    </Box>
  )
}

export default ListInvitesSendPage
