import { useQuery } from '@tanstack/react-query'

import { useAppSession } from '@/features/authentication/hooks/use-app-session'

import {
  professionalDetailsQueryOptions,
  professionalsListQueryOptions,
} from '../queries/professionals.query-options'

export function useProfessionals(establishmentId: string, enabled = true) {
  const { data: session } = useAppSession()
  return useQuery({
    ...professionalsListQueryOptions(
      establishmentId,
      session?.user.id,
      session?.session.activeOrganizationId ?? undefined,
    ),
    enabled,
  })
}

export function useProfessional(professionalId?: string) {
  const { data: session } = useAppSession()
  return useQuery(
    professionalDetailsQueryOptions(
      professionalId,
      session?.user.id,
      session?.session.activeOrganizationId ?? undefined,
    ),
  )
}
