import { createFileRoute } from '@tanstack/react-router'

import ServiceEstablishmentDetails from '@/features/service-establishment/pages/service-establishment-details'

export const Route = createFileRoute(
  '/dashboard/$establishmentId/services/_pages/$serviceEstablishmentId/info/',
)({
  component: ServiceEstablishmentInfoPage,
})

function ServiceEstablishmentInfoPage() {
  return (
    <div>
      <ServiceEstablishmentDetails />
    </div>
  )
}
