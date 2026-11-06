import { createFileRoute } from '@tanstack/react-router'

import AddressPage from '@/features/address/pages/address.page'

export const Route = createFileRoute('/dashboard/$slug/address/')({
  component: AddressPage,
  head: () => ({
    meta: [{ title: 'Endereço' }],
  }),
})
