import { For, Table } from '@chakra-ui/react'

const loadCollaboratorsTableHeader = [
  'Avatar',
  'Nome',
  'E-mail',
  'Celular',
  'Especialidade',
  'Status',
] as const

const CollaboratorsTableHeader = () => {
  return (
    <Table.Header>
      <Table.Row bg={{ base: 'white', _dark: 'transparent' }}>
        <For each={loadCollaboratorsTableHeader}>
          {(header) => (
            <Table.ColumnHeader key={header} py="3">
              {header}
            </Table.ColumnHeader>
          )}
        </For>

        <Table.ColumnHeader py="3" textAlign="end">
          Ações
        </Table.ColumnHeader>
      </Table.Row>
    </Table.Header>
  )
}

export default CollaboratorsTableHeader
