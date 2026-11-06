import { createFileRoute } from '@tanstack/react-router'
import z from 'zod'

import ServiceEstablishmentDetails from '@/features/service-establishment/pages/service-establishment-details'

export const Route = createFileRoute(
  '/_app/_authenticated/dashboard/$slug/services/_pages/$serviceEstablishmentId/info/',
)({
  head: () => ({
    meta: [{ title: 'Detalhes do serviço' }],
  }),
  validateSearch: z.object({
    page: z.number().optional().default(1),
    page_size: z.number().optional().default(5),
  }),
  component: ServiceEstablishmentInfoPage,
})

function ServiceEstablishmentInfoPage() {
  return (
    <>
      <ServiceEstablishmentDetails />
    </>
  )
}
