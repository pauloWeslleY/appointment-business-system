import {
  Avatar,
  Box,
  Card,
  DataList,
  Flex,
  HStack,
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
      <Flex flex="1">
        <DataList.Root orientation="vertical" gap="4">
          <DataList.Item>
            <DataList.ItemLabel>Nome</DataList.ItemLabel>
            <DataList.ItemValue>
              <HStack>
                <Avatar.Root size="md">
                  {review.user.image && (
                    <Avatar.Image
                      src={review.user.image}
                      alt={review.user.name}
                    />
                  )}
                  <Avatar.Fallback aria-label={review.user.name} />
                </Avatar.Root>
                <Box fontWeight="bold">{review.user.name}</Box>
              </HStack>
            </DataList.ItemValue>
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
