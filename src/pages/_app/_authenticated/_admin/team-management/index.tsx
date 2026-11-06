import { Skeleton, Stack } from '@chakra-ui/react'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_app/_authenticated/_admin/team-management/',
)({
  head: () => ({
    meta: [{ title: 'Equipe e acessos' }],
  }),
  beforeLoad: () => {
    throw redirect({ to: '/team-management/members', replace: true })
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Stack>
      <Skeleton height="20px" />
      <Skeleton height="20px" />
      <Skeleton height="20px" />
    </Stack>
  )
}
