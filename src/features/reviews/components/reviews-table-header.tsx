import { For, Table } from '@chakra-ui/react'

const loadReviewsTableHeader = [
  'Avatar',
  'Nome',
  'Comentário',
  'Nota',
  'Data da avaliação',
]

const ReviewsTableHeader = () => {
  return (
    <Table.Header>
      <Table.Row
        bg={{ base: 'colorPalette.200', _dark: 'colorPalette.900/40' }}
      >
        <For each={loadReviewsTableHeader}>
          {(header) => <Table.ColumnHeader py="3">{header}</Table.ColumnHeader>}
        </For>
        {/* <Table.ColumnHeader py="3" textAlign="end">
                    Ações
                  </Table.ColumnHeader> */}
      </Table.Row>
    </Table.Header>
  )
}

export default ReviewsTableHeader
