import { Skeleton, Stack } from '@chakra-ui/react'
import { createFileRoute, redirect } from '@tanstack/react-router'

import { skeletonStyles } from '@/theme/styles/global-styles'

export const Route = createFileRoute(
  '/_app/_authenticated/_admin/team-management/',
)({
  beforeLoad: () => {
    throw redirect({
      to: '/team-management/members',
      replace: true,
    })
  },
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: 'Equipe e acessos | Agendros',
      },
    ],
  }),
})

function RouteComponent() {
  return (
    <Stack>
      <Skeleton h="20px" {...skeletonStyles} />
      <Skeleton h="20px" {...skeletonStyles} />
      <Skeleton h="20px" {...skeletonStyles} />
    </Stack>
  )
}
