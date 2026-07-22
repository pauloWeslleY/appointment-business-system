import { SimpleGrid } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

import CardInfoOwner from '@/features/owner/components/card-info-owner'
import FormUpdateOwner from '@/features/owner/pages/form-update-owner'
import { ownerQueryKeys } from '@/features/owner/queries/owner-query-key'
import type { OwnerDetailsModel } from '@/features/owner/types/owner-details.model'
import { authClient } from '@/lib/auth'

export const Route = createFileRoute('/_authenticated/owner/_routes/$ownerId/')(
  {
    component: OwnerPage,
  },
)

function OwnerPage() {
  const { data: session } = authClient.useSession()
  const queryClient = useQueryClient()
  const owner = queryClient.getQueryData<OwnerDetailsModel>(
    ownerQueryKeys.user(session?.user?.id),
  )

  return (
    <SimpleGrid gap="4" columns={{ base: 1, md: 3 }}>
      <CardInfoOwner owner={owner} />
      <FormUpdateOwner />
    </SimpleGrid>
  )
}
