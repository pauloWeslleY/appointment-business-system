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
    <InputField
      placeholder="Buscar agendamento por cliente"
      w="450px"
      value={search}
      onChange={handleSearchChange}
    />
  )
}

export default SearchBookingsClient
