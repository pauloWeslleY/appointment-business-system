import { Box, Card, Flex, HStack, Icon } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import { Star } from 'lucide-react'
import z from 'zod'

import Header from '@/components/layout/header'
import SearchPage from '@/components/search-page'
import FilterReviewsNotes from '@/features/reviews/components/filter-reviews-notes'
import ReviewsListPage from '@/features/reviews/pages/reviews-list.page'
import { cardSectionCss } from '@/theme/styles/global-styles'

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
          <Flex
            align="center"
            justify="center"
            boxSize="8"
            rounded="full"
            bg={{ base: 'primary.200/60', _dark: 'primary.700/80' }}
          >
            <Icon
              as={Star}
              boxSize="5"
              color={{ base: 'primary.400', _dark: 'primary.200' }}
            />
          </Flex>

          <Header.Title>Avaliações</Header.Title>
        </HStack>
      </Header.Root>

      <Card.Root variant="outline" css={cardSectionCss}>
        <HStack mb="4">
          <SearchPage />
          <FilterReviewsNotes />
        </HStack>

        <ReviewsListPage />
      </Card.Root>
    </Box>
  )
}
