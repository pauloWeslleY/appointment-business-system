import {
  Box,
  Button,
  HStack,
  Icon,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from '@chakra-ui/react'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { UserSquare2 } from 'lucide-react'

import Header from '@/components/layout/header'
import { authClient } from '@/shared/auth'
import useGetOwnerById from '@/shared/hooks/use-get-owner-by-id'

export const Route = createFileRoute('/_authenticated/owner')({
  beforeLoad: async () => {
    const { data: session } = await authClient.getSession()
    if (!session?.user) {
      throw redirect({
        to: '/login',
        hash: 'owner',
        search: `redirectTo=${encodeURIComponent(
          window.location.pathname + window.location.search,
        )}`,
      })
    }
  },
  component: OwnerLayout,
})

function OwnerLayout() {
  const { data: owner, isLoading: isOwnerLoading } = useGetOwnerById()
  const navigate = Route.useNavigate()

  if (isOwnerLoading) {
    return (
      <Stack gap="4" w="full" p="2">
        <HStack width="full">
          <SkeletonCircle size="10" />
          <SkeletonText noOfLines={2} />
        </HStack>
        <Skeleton height="100px" rounded="xl" />
        <Skeleton height="100px" rounded="xl" />
        <Skeleton height="100px" rounded="xl" />
      </Stack>
    )
  }

  return (
    <Box spaceY={{ base: '4', lg: '6' }}>
      <Header.Root justify="space-between">
        <HStack align="center">
          <Header.Button />
          <Header.Title lineHeight={0}>Proprietário</Header.Title>
        </HStack>

        {!owner && (
          <Button
            rounded="xl"
            size="sm"
            onClick={() => navigate({ to: '/owner/new' })}
          >
            <Icon as={UserSquare2} boxSize="5" />
            Cadastrar proprietário
          </Button>
        )}
      </Header.Root>

      <Outlet />
    </Box>
  )
}
