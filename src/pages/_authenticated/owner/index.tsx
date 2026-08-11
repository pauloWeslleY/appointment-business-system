import { Box, SimpleGrid } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import { UserSquare2 } from 'lucide-react'

import Header from '@/components/layout/header'
import NotFoundPage from '@/components/layout/not-found'
import CardInfoOwner from '@/features/owner/components/card-info-owner'
import FormUpdateOwner from '@/features/owner/pages/form-update-owner'
import { ownerByUserIdQueryOptions } from '@/features/owner/queries/owner-query-options'

export const Route = createFileRoute('/_authenticated/owner/')({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(ownerByUserIdQueryOptions(context.id)),
  component: OwnerPage,
  notFoundComponent: NotFoundPage,
})

function OwnerPage() {
  const owner = Route.useLoaderData()

  return (
    <Box spaceY={{ base: '4', lg: '6' }}>
      <Header.Root>
        <Header.Icon icon={UserSquare2} />
        <Header.Title>Proprietário</Header.Title>
      </Header.Root>

      <SimpleGrid gap="4" columns={{ base: 1, md: 3 }}>
        <CardInfoOwner owner={owner} />
        <FormUpdateOwner />
      </SimpleGrid>
    </Box>
  )
}
