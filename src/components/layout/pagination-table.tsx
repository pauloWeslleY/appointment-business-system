import {
  ButtonGroup,
  IconButton,
  Pagination,
  type PaginationRootProps,
} from '@chakra-ui/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const PaginationTable = (props: PaginationRootProps) => {
  return (
    <Pagination.Root {...props}>
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

export default PaginationTable
