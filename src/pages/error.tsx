import { Alert, Box } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import z from 'zod'

export const Route = createFileRoute('/error')({
  validateSearch: z.object({
    search: z.string().optional().default(''),
  }),
  component: ErrorPage,
})

function ErrorPage() {
  const search = Route.useSearch()

  return (
    <Box p="4">
      <Alert.Root status="error" rounded="xl">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>Erro ao carregar a página</Alert.Title>
          <Alert.Description>{search.search}</Alert.Description>
        </Alert.Content>
      </Alert.Root>
    </Box>
  )
}
