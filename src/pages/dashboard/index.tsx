import {
  HStack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from '@chakra-ui/react'
import { Navigate } from '@tanstack/react-router'
import { createFileRoute } from '@tanstack/react-router'
import React from 'react'

import Sidebar from '@/components/layout/sidebar'
import { loadMenuDashboardEstablishment } from '@/features/establishment/constants/menu-dashboard-establishment'
import useGetEstablishmentById from '@/features/establishment/hooks/use-get-establishment-by-id'

export const Route = createFileRoute('/dashboard/')({
  component: DashboardLayout,
})

function DashboardLayout() {
  const { data, isLoading } = useGetEstablishmentById('')

  if (!data || isLoading) {
    return (
      <Sidebar.Root>
        <Sidebar.Aside loading={!data}>
          {Array.from({ length: loadMenuDashboardEstablishment.length }).map(
            (_, index) => (
              <React.Fragment key={index}>
                <Skeleton height="30px" rounded="xl" />
                <Skeleton height="30px" rounded="xl" />
              </React.Fragment>
            ),
          )}
        </Sidebar.Aside>

        <Sidebar.Content overflowY="auto">
          <Sidebar.Header />

          <Sidebar.Body>
            <Stack gap="4" w="full" p="2">
              <HStack width="full">
                <SkeletonCircle size="10" />
                <SkeletonText noOfLines={2} />
              </HStack>
              <Skeleton height="100px" rounded="xl" />
              <Skeleton height="100px" rounded="xl" />
              <Skeleton height="100px" rounded="xl" />
            </Stack>
          </Sidebar.Body>
        </Sidebar.Content>
      </Sidebar.Root>
    )
  }

  return <Navigate to="/establishment" replace />
}
