import { useEffect, useState } from 'react'

const SEARCH_DEBOUNCE_MS = 500

export function useDebouncedSearch(value: string): string {
  const [settledValue, setSettledValue] = useState(value)

  useEffect(() => {
    const timeout = window.setTimeout(
      () => setSettledValue(value),
      value.length === 0 ? 0 : SEARCH_DEBOUNCE_MS,
    )

    return () => window.clearTimeout(timeout)
  }, [value])

  return settledValue
}
