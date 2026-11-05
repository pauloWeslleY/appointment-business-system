import { createFileRoute } from '@tanstack/react-router'

import ServicesPage from '@/features/service-establishment/pages/service-establishment.page'
import { ServiceEstablishmentRouteSearchSchema } from '@/features/service-establishment/schemas/service-establishment-route-search.schema'

export const Route = createFileRoute('/dashboard/$slug/services/')({
  validateSearch: ServiceEstablishmentRouteSearchSchema,
  component: ServicesPage,
})
