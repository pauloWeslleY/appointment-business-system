import {
  Accordion,
  Box,
  Card,
  chakra,
  Heading,
  HStack,
  Input,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { CircleHelp } from 'lucide-react'
import { useState } from 'react'

import Header from '@/components/layout/header'
import { cardSectionCss, inputFieldStyles } from '@/theme/styles/global-styles'

import { frequentlyAskedQuestionGroups } from '../constants/frequently-asked-questions'

function normalizeSearchText(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR')
    .trim()
}

export default function FrequentlyAskedQuestionsPage() {
  const [search, setSearch] = useState('')
  const searchTerms = normalizeSearchText(search).split(/\s+/).filter(Boolean)
  const groups = frequentlyAskedQuestionGroups
    .map((group) => ({
      ...group,
      questions: group.questions.filter((question) => {
        const content = normalizeSearchText(
          `${group.title} ${question.title} ${question.answer}`,
        )

        return searchTerms.every((term) => content.includes(term))
      }),
    }))
    .filter((group) => group.questions.length > 0)
  const questionCount = groups.reduce(
    (total, group) => total + group.questions.length,
    0,
  )

  return (
    <Stack gap={{ base: '4', lg: '6' }} minW="0" pb="4">
      <Header.Root>
        <HStack align="start" minW="0">
          <Header.Icon icon={CircleHelp} />
          <Box minW="0">
            <Header.Title>Dúvidas frequentes</Header.Title>
            <Header.SubTitle>
              Encontre orientações para configurar sua empresa e usar o Agendros
              no dia a dia.
            </Header.SubTitle>
          </Box>
        </HStack>
      </Header.Root>

      <Card.Root variant="outline" css={cardSectionCss}>
        <Stack gap="2">
          <chakra.label htmlFor="faq-search" fontSize="sm" fontWeight="medium">
            Qual é a sua dúvida?
          </chakra.label>
          <Input
            id="faq-search"
            type="search"
            placeholder="Busque por agenda, senha, assinatura..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            variant="subtle"
            {...inputFieldStyles}
          />
          <Text fontSize="sm" color="fg.muted" role="status" aria-live="polite">
            {questionCount === 1
              ? '1 pergunta encontrada'
              : `${questionCount} perguntas encontradas`}
          </Text>
        </Stack>
      </Card.Root>

      {groups.length === 0 && (
        <Card.Root variant="outline" css={cardSectionCss}>
          <Stack gap="2" py="6" align="center" textAlign="center">
            <Heading as="h2" size="md">
              Nenhuma dúvida encontrada
            </Heading>
            <Text color="fg.muted">
              Tente outro termo ou limpe a busca para ver todas as perguntas.
            </Text>
          </Stack>
        </Card.Root>
      )}

      <SimpleGrid
        columns={{ base: 1, xl: 2 }}
        gap="4"
        alignItems="start"
        minW="0"
      >
        {groups.map((group) => (
          <Card.Root
            key={group.id}
            as="section"
            aria-labelledby={`faq-${group.id}`}
            variant="outline"
            css={cardSectionCss}
          >
            <Heading
              as="h2"
              id={`faq-${group.id}`}
              size="md"
              px="4"
              pt="3"
              pb="2"
            >
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
                    <Accordion.ItemIndicator flexShrink="0" />
                  </Accordion.ItemTrigger>
                  <Accordion.ItemContent>
                    <Accordion.ItemBody
                      px="4"
                      pt="0"
                      pb="4"
                      color="fg.muted"
                      fontSize="sm"
                      lineHeight="tall"
                      overflowWrap="anywhere"
                    >
                      {question.answer}
                    </Accordion.ItemBody>
                  </Accordion.ItemContent>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </Card.Root>
        ))}
      </SimpleGrid>
    </Stack>
  )
}
