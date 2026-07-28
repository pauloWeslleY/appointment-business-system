import {
  Icon,
  IconButton,
  InputGroup,
  type InputGroupProps,
} from '@chakra-ui/react'
import { SearchIcon, X } from 'lucide-react'
import { debounce, parseAsString, useQueryState } from 'nuqs'
import type { ChangeEvent } from 'react'

import InputField from '@/components/input-field'

const SearchPage = (props: Omit<InputGroupProps, 'children'>) => {
  const [search, setSearch] = useQueryState('q', parseAsString.withDefault(''))

  function handleSearchPage(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value, {
      limitUrlUpdates:
        event.target.value.length !== 0 ? debounce(500) : undefined,
    })
  }

  function handleClearSearchPage() {
    setSearch('', {
      limitUrlUpdates: debounce(500),
    })
  }

  return (
    <InputGroup
      w="450px"
      {...props}
      startElement={<Icon as={SearchIcon} boxSize="5" />}
      endElement={
        <IconButton
          size="2xs"
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
        value={search}
        onChange={handleSearchPage}
      />
    </InputGroup>
  )
}

export default SearchPage
