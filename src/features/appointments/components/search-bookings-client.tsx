import { Icon, InputGroup } from '@chakra-ui/react'
import { SearchIcon } from 'lucide-react'
import { debounce, parseAsString, useQueryState } from 'nuqs'
import type { ChangeEvent } from 'react'

import InputField from '@/components/input-field'

const SearchBookingsClient = () => {
  const [search, setSearch] = useQueryState('q', parseAsString.withDefault(''))

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value, {
      limitUrlUpdates:
        event.target.value.length !== 0 ? debounce(500) : undefined,
    })
  }

  return (
    <InputGroup startElement={<Icon as={SearchIcon} boxSize="5" />} w="450px">
      <InputField
        placeholder="Buscar agendamento por cliente"
        value={search}
        onChange={handleSearchChange}
      />
    </InputGroup>
  )
}

export default SearchBookingsClient
