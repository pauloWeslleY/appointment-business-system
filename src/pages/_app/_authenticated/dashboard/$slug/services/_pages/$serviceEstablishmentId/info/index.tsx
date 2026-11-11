import { createFileRoute } from '@tanstack/react-router'

import ServiceEstablishmentDetails from '@/features/service-establishment/pages/service-establishment-details'
import { ServiceEstablishmentDetailsRouteSearchSchema } from '@/features/service-establishment/schemas/service-establishment-details-route-search.schema'

export const Route = createFileRoute(
  '/_app/_authenticated/dashboard/$slug/services/_pages/$serviceEstablishmentId/info/',
)({
  validateSearch: ServiceEstablishmentDetailsRouteSearchSchema,
  component: ServiceEstablishmentInfoPage,
  head: () => ({
    meta: [
      {
        title: 'Detalhes do serviço | Agendros',
      },
    ],
  }),
})

function ServiceEstablishmentInfoPage() {
  return <ServiceEstablishmentDetails />
}
