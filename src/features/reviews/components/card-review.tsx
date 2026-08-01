import {
  Avatar,
  Box,
  Card,
  DataList,
  Flex,
  RatingGroup,
} from '@chakra-ui/react'

import { formattedDateAndHours } from '@/shared/utils/formatted-date'
import { cardCss } from '@/theme/styles/global-styles'

import type { ReviewEstablishmentModel } from '../types/reviews-establishment.model'

interface CardReviewProps {
  review: ReviewEstablishmentModel
}

const CardReview = ({ review }: CardReviewProps) => {
  return (
    <Card.Root
      variant="outline"
      display="flex"
      flexDir="row"
      alignItems="center"
      gap="4"
      css={cardCss}
    >
      <Box minW="14" maxW="14">
        <Avatar.Root boxSize="14">
          {review.user.image && (
            <Avatar.Image src={review.user.image} alt={review.user.name} />
          )}
          <Avatar.Fallback aria-label={review.user.name} />
        </Avatar.Root>
      </Box>

      <Flex flex="1">
        <DataList.Root orientation="horizontal" gap="2">
          <DataList.Item>
            <DataList.ItemLabel>Nome</DataList.ItemLabel>
            <DataList.ItemValue>{review.user.name}</DataList.ItemValue>
          </DataList.Item>

          <DataList.Item>
            <DataList.ItemLabel>Avaliação</DataList.ItemLabel>
            <DataList.ItemValue>
              <RatingGroup.Root
                readOnly
                count={5}
                defaultValue={Number.parseInt(String(review.rating), 10)}
                size="sm"
                colorPalette="pink"
              >
                <RatingGroup.HiddenInput />
                <RatingGroup.Control />
              </RatingGroup.Root>
            </DataList.ItemValue>
          </DataList.Item>

          <DataList.Item>
            <DataList.ItemLabel>Comentário</DataList.ItemLabel>
            <DataList.ItemValue>
              {review.comment ?? 'Sem comentário'}
            </DataList.ItemValue>
          </DataList.Item>

          <DataList.Item>
            <DataList.ItemLabel>Data</DataList.ItemLabel>
            <DataList.ItemValue>
              {formattedDateAndHours(review.createdAt)}
            </DataList.ItemValue>
          </DataList.Item>
        </DataList.Root>
      </Flex>
    </Card.Root>
  )
}

export default CardReview
