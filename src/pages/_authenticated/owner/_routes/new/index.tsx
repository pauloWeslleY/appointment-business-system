import { createFileRoute } from '@tanstack/react-router'

import FormCreateOwner from '@/features/owner/pages/form-create-owner'

export const Route = createFileRoute('/_authenticated/owner/_routes/new/')({
  component: CreateOwnerPage,
})

function CreateOwnerPage() {
  return <FormCreateOwner />
}
