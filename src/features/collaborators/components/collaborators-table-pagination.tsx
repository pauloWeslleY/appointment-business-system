import {
  ButtonGroup,
  IconButton,
  Pagination,
  type PaginationPageChangeDetails,
} from '@chakra-ui/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CollaboratorsTablePaginationProps {
  count: number
  pagination: {
    page: number
    page_size: number
  }
  onPageChange: (details: PaginationPageChangeDetails) => void
}

const CollaboratorsTablePagination = ({
  count,
  pagination,
  onPageChange,
}: CollaboratorsTablePaginationProps) => {
  return (
    <Pagination.Root
      count={count}
      pageSize={pagination.page_size}
      page={pagination.page}
      onPageChange={onPageChange}
    >
      <ButtonGroup alignSelf="end" size="sm" variant="subtle">
        <Pagination.PrevTrigger asChild>
          <IconButton aria-label="Página anterior" rounded="xl">
            <ChevronLeft />
          </IconButton>
        </Pagination.PrevTrigger>

        <Pagination.Items
          render={(item) => (
            <IconButton
              aria-label={`Página ${item.value}`}
              variant={{ base: 'ghost', _selected: 'outline' }}
              rounded="xl"
            >
              {item.value}
            </IconButton>
          )}
        />

        <Pagination.NextTrigger asChild>
          <IconButton aria-label="Próxima página" rounded="xl">
            <ChevronRight />
          </IconButton>
        </Pagination.NextTrigger>
      </ButtonGroup>
    </Pagination.Root>
  )
}

export default CollaboratorsTablePagination
