import {
  Icon,
  IconButton,
  InputGroup,
  type InputGroupProps,
} from '@chakra-ui/react'
import { SearchIcon, X } from 'lucide-react'
import { debounce, parseAsInteger, parseAsString, useQueryStates } from 'nuqs'
import type { ChangeEvent } from 'react'

import InputField from '@/components/input-field'

interface SearchPageProps extends Omit<InputGroupProps, 'children'> {
  resetPagination?: boolean
}

const SearchPage = ({ resetPagination = false, ...props }: SearchPageProps) => {
  const [{ q: search }, setSearch] = useQueryStates({
    q: parseAsString.withDefault(''),
    page: parseAsInteger.withDefault(1),
  })

  function handleSearchPage(event: ChangeEvent<HTMLInputElement>) {
    setSearch(
      { q: event.target.value, ...(resetPagination ? { page: 1 } : {}) },
      {
        shallow: resetPagination,
        limitUrlUpdates:
          event.target.value.length !== 0 ? debounce(500) : undefined,
      },
    )
  }

  function handleClearSearchPage() {
    setSearch(
      { q: '', ...(resetPagination ? { page: 1 } : {}) },
      {
        shallow: resetPagination,
        limitUrlUpdates: debounce(500),
      },
    )
  }

  return (
    <InputGroup
      w={{ base: 'full', md: '450px' }}
      minW="0"
      maxW="full"
      {...props}
      startElement={<Icon as={SearchIcon} boxSize="5" />}
      endElement={
        <IconButton
          size="2xs"
          aria-label="Limpar busca"
          variant="ghost"
          rounded="full"
          disabled={search.length === 0}
          onClick={handleClearSearchPage}
        >
          <Icon as={X} boxSize="4" />
        </IconButton>
      }
    >
      <InputField
        placeholder="Buscar..."
        aria-label="Buscar"
        value={search}
        onChange={handleSearchPage}
      />
    </InputGroup>
  )
}

export default SearchPage
