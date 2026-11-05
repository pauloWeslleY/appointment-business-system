import { useQuery } from '@tanstack/react-query'

import { authClient } from '@/lib/auth'

import {
  professionalDetailsQueryOptions,
  professionalsListQueryOptions,
} from '../queries/professionals.query-options'

export function useProfessionals(establishmentId: string) {
  const { data: session } = authClient.useSession()
  return useQuery(
    professionalsListQueryOptions(
      establishmentId,
      session?.user.id,
      session?.session.activeOrganizationId ?? undefined,
    ),
  )
}

export function useProfessional(professionalId?: string) {
  const { data: session } = authClient.useSession()
  return useQuery(
    professionalDetailsQueryOptions(
      professionalId,
      session?.user.id,
      session?.session.activeOrganizationId ?? undefined,
    ),
  )
}
