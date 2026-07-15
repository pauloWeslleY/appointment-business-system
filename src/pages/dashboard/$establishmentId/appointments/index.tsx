import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/$establishmentId/appointments/')({
  component: AppointmentPage,
})

function AppointmentPage() {
  return <div>Hello "/_dashboard/_pages/appointment/"!</div>
}
