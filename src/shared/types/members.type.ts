import type { FullOrganization } from '@/features/organization-profile/services/organization.service'

export type Member = FullOrganization['members'][number]
