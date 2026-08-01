import { useQuery } from '@tanstack/react-query'

import { collaboratorsQueryKeys } from '../queries/collaborators-query-key'
import { getCollaboratorByEstablishmentService } from '../services/collaborators.service'

export function useGetAllCollaboratorsByEstablishment(
  establishmentId?: string,
) {
  return useQuery({
    queryKey: collaboratorsQueryKeys.establishment(establishmentId),
    queryFn: () => getCollaboratorByEstablishmentService(establishmentId),
    enabled: !!establishmentId,
  })
}
