import { Navigate } from '@tanstack/react-router'
import { createFileRoute } from '@tanstack/react-router'

import LoaderFull from '@/components/loader-full'
import useGetEstablishmentById from '@/features/establishment/hooks/use-get-establishment-by-id'

export const Route = createFileRoute('/_app/_authenticated/dashboard/')({
  pendingComponent: LoaderFull,
  head: () => ({
    meta: [{ title: 'Dashboard | Agendros' }],
  }),
  component: DashboardLayout,
})

function DashboardLayout() {
  const { data, isLoading } = useGetEstablishmentById('')

  if (!data || isLoading) {
    return <LoaderFull />
  }

  return <Navigate to="/establishment" replace />
}
