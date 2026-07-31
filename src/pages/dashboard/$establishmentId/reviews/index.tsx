import { Box, Card, HStack } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import z from 'zod'

import Header from '@/components/layout/header'
import SearchPage from '@/components/search-page'
import FilterReviewsNotes from '@/features/reviews/components/filter-reviews-notes'
import ReviewsTablePage from '@/features/reviews/pages/reviews-table.page'

export const Route = createFileRoute('/dashboard/$establishmentId/reviews/')({
  validateSearch: z.object({
    q: z.string().optional(),
    notes: z.coerce.number().min(0).max(5).optional(),
  }),
  component: ReviewsPage,
})

function ReviewsPage() {
  return (
    <Box spaceY={{ base: '4', lg: '6' }}>
      <Header.Root>
        <HStack align="center">
          <Header.Button />

          <div>
            <Header.Title>Avaliações</Header.Title>
            <Header.SubTitle>Gerencie suas avaliações</Header.SubTitle>
          </div>
        </HStack>
      </Header.Root>

      <Card.Root
        variant="outline"
        rounded="xl"
        p="4"
        shadow="xs"
        bg={{ base: 'white', _dark: 'gray.950/40' }}
        borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
      >
        <HStack mb="4">
          <SearchPage />
          <FilterReviewsNotes />
        </HStack>

        <ReviewsTablePage />
      </Card.Root>
    </Box>
  )
}
