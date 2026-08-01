import { Avatar, Table } from '@chakra-ui/react'

import { Status } from '@/components/ui/status'
import { FormatMask, formatterMask } from '@/shared/utils/formatted-mask'

import type { CollaboratorEstablishmentModel } from '../types/collaborator-establishment.type'
import {
  mapColorStatusCollaborator,
  mapLabelStatusCollaborator,
} from '../types/status-collaborator.type'
import MenuActionsTableCollaborator from './menu-actions-table-collaborator'

interface CollaboratorTableRowsProps {
  collaborator: CollaboratorEstablishmentModel
}

const AvatarTableRow = (props: { imageUrl: string | null; name: string }) => (
  <Avatar.Root size="md">
    {props.imageUrl && <Avatar.Image src={props.imageUrl} alt={props.name} />}
    <Avatar.Fallback />
  </Avatar.Root>
)

const CollaboratorTableRows = ({
  collaborator,
}: CollaboratorTableRowsProps) => {
  const loadCellPhone = formatterMask(
    collaborator.cellphone,
    FormatMask.CELLPHONE,
  )

  return (
    <Table.Row
      transition="colors"
      bg={{ base: 'white', _dark: 'gray.950/40' }}
      _hover={{
        bg: { base: 'gray.100', _dark: 'primary.900/30' },
      }}
    >
      <Table.Cell>
        <AvatarTableRow
          imageUrl={collaborator.imageUrl}
          name={collaborator.name}
        />
      </Table.Cell>
      <Table.Cell>{collaborator.name}</Table.Cell>
      <Table.Cell>{collaborator.email}</Table.Cell>
      <Table.Cell>{loadCellPhone}</Table.Cell>
      <Table.Cell>{collaborator.specialty}</Table.Cell>
      <Table.Cell>
        <Status
          size="sm"
          colorPalette={mapColorStatusCollaborator[collaborator.status]}
        >
          {mapLabelStatusCollaborator(collaborator.status)}
        </Status>
      </Table.Cell>

      <Table.Cell textAlign="end">
        <MenuActionsTableCollaborator collaborator={collaborator} />
      </Table.Cell>
    </Table.Row>
  )
}

export default CollaboratorTableRows
