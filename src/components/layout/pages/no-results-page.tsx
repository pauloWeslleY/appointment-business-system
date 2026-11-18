import {
  Button,
  Flex,
  Heading,
  Icon,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Link } from '@tanstack/react-router'
import { ArrowRight, Search } from 'lucide-react'

import Logotipo from '@/components/logotipo'

import BackgroundShapes from './background-shapes'
import {
  pageCardCss,
  pageDescriptionCss,
  pageIllustrationCss,
  pagePrimaryActionCss,
  pageSecondaryActionCss,
  pageTitleCss,
} from './define-styles'
import { usePagesValidateSession } from './use-pages-validate-session'

interface NoResultsPageProps {
  onClearFilters: () => void
}

const NoResultsPage = ({ onClearFilters }: NoResultsPageProps) => {
  const { homeRoute } = usePagesValidateSession()

  return (
    <Flex
      as="section"
      direction={{ base: 'column-reverse', md: 'row' }}
      align="center"
      justify="space-between"
      gap={{ base: '6', md: '10' }}
      css={pageCardCss}
    >
      <BackgroundShapes />

      <Stack gap="6" align="flex-start" minW="0" zIndex="1">
        <Logotipo variant="horizontal" h="8" />

        <Stack gap="2">
          <Heading as="h2" css={pageTitleCss}>
            Nenhum resultado encontrado
          </Heading>
          <Text css={pageDescriptionCss}>
            Não encontramos informações correspondentes ao que você está
            procurando.
          </Text>
        </Stack>

        <Stack gap="3" align="flex-start">
          <Button size="sm" css={pagePrimaryActionCss} onClick={onClearFilters}>
            <Icon as={Search} />
            Limpar filtros
          </Button>

          <Button
            asChild
            variant="plain"
            size="sm"
            css={pageSecondaryActionCss}
          >
            <Link to={homeRoute}>
              <Icon as={ArrowRight} />
              Voltar para o início
            </Link>
          </Button>
        </Stack>
      </Stack>

      <Image
        src="/illustrations/status/no-results.svg"
        alt=""
        css={pageIllustrationCss}
      />
    </Flex>
  )
}

export default NoResultsPage
