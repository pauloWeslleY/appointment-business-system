import {
  Box,
  Card,
  chakra,
  For,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react'
import { CircleHelp } from 'lucide-react'
import { useMemo, useState } from 'react'

import Header from '@/components/layout/header'
import { cardSectionCss, inputFieldStyles } from '@/theme/styles/global-styles'

import ItemGroupQuestions from '../components/item-group-questions'
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

  const listGroupQuestions = useMemo(() => {
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

    return {
      groups,
      questionCount,
      searchTerms,
    }
  }, [search])

  return (
    <Stack gap={{ base: '4', lg: '6' }} minW="0" pb="4">
      <Header.Root>
        <HStack align="center" minW="0">
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
            {listGroupQuestions.questionCount === 1
              ? '1 pergunta encontrada'
              : `${listGroupQuestions.questionCount} perguntas encontradas`}
          </Text>
        </Stack>
      </Card.Root>

      {listGroupQuestions.groups.length === 0 && (
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

      <Box
        minW="0"
        css={{
          columnWidth: '480px',
          columnGap: '4',
          '& > *': {
            breakInside: 'avoid',
            marginBottom: '4',
          },
        }}
      >
        <For each={listGroupQuestions.groups}>
          {(group) => <ItemGroupQuestions key={group.id} group={group} />}
        </For>
      </Box>
    </Stack>
  )
}
