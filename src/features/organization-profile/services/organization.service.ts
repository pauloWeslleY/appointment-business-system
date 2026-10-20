import { authClient } from '@/lib/auth'

export async function getFullOrganization(organizationId: string) {
  return await authClient.organization.getFullOrganization({
    query: {
      organizationId,
    },
  })
}

export type GetFullOrganizationResponse = Awaited<
  ReturnType<typeof getFullOrganization>
>

export type FullOrganization = NonNullable<GetFullOrganizationResponse['data']>
