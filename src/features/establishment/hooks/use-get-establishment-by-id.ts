import { useQuery } from '@tanstack/react-query'

import { establishmentByIdQueryOptions } from '../queries/establishment-query-options'

const useGetEstablishmentById = (establishmentId: string) => {
  return useQuery(establishmentByIdQueryOptions(establishmentId))
}

export default useGetEstablishmentById
