import { Accordion, Box, Card, Heading } from '@chakra-ui/react'

import { cardSectionCss } from '@/theme/styles/global-styles'

import type { FrequentlyAskedQuestionGroup } from '../constants/frequently-asked-questions'

interface ItemGroupQuestionsProps {
  group: FrequentlyAskedQuestionGroup
}

const ItemGroupQuestions = ({ group }: ItemGroupQuestionsProps) => {
  return (
    <Card.Root
      as="section"
      aria-labelledby={`faq-${group.id}`}
      variant="outline"
      h="fit"
      css={cardSectionCss}
    >
      <Heading as="h2" id={`faq-${group.id}`} size="md" px="4" pt="3" pb="2">
        {group.title}
      </Heading>
      <Accordion.Root collapsible multiple variant="outline" minW="0">
        {group.questions.map((question) => (
          <Accordion.Item key={question.id} value={question.id}>
            <Accordion.ItemTrigger
              px="4"
              py="4"
              gap="3"
              fontSize="sm"
              fontWeight="medium"
              textAlign="start"
            >
              <Box as="span" flex="1" minW="0" overflowWrap="anywhere">
                {question.title}
              </Box>
            </Accordion.ItemTrigger>
            <Accordion.ItemContent px="4" py="2">
              {question.answer}
            </Accordion.ItemContent>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </Card.Root>
  )
}

export default ItemGroupQuestions
