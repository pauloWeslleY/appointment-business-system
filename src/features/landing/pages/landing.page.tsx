import {
  Accordion,
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Text,
} from '@chakra-ui/react'

import Banner from '../components/banner'
import Depoiments from '../components/depoiments'
import Eyebrow from '../components/evebrow'
import Footer from '../components/footer'
import NavBarLandingPage from '../components/navbar-landing-page'
import Planns from '../components/plans'
import SessionDetails from '../components/session-details'
import SessionInfo from '../components/session-info'
import SessionSummary from '../components/session-summary'
import { questions } from '../constants/data-landing-page'
import { featuresLandingPage } from '../constants/features'

export function LandingPage() {
  return (
    <Box
      bg="white"
      color="brand.navy"
      fontFamily="Inter, Geist, Arial, sans-serif"
      scrollBehavior="smooth"
      css={{
        '& h1, & h2, & h3': {
          fontFamily: 'inherit',
          letterSpacing: '-0.035em',
        },
        '& section': { scrollMarginTop: '32px' },
        '& a': { textDecoration: 'none' },
      }}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
      />

      <NavBarLandingPage />
      <Banner />

      <Container maxW="breakpoint-2xl" px={{ base: 6, md: 10 }}>
        <Grid
          templateColumns={{ base: '1fr 1fr', md: 'repeat(4, 1fr)' }}
          py="9"
          gap="7"
        >
          {featuresLandingPage.map(({ icon: Icon, title, text }) => (
            <Box key={title}>
              <Flex
                bg="brand.mint"
                color="sea.700"
                rounded="xl"
                w="48px"
                h="48px"
                align="center"
                justify="center"
                mb="4"
              >
                <Icon size={25} />
              </Flex>
              <Heading as="h3" fontSize="15px" mb="2">
                {title}
              </Heading>
              <Text color="brand.slate" fontSize="13px" maxW="205px">
                {text}
              </Text>
            </Box>
          ))}
        </Grid>

        <SessionSummary />
      </Container>

      <SessionDetails />
      <SessionInfo />
      <Depoiments />
      <Planns />

      <Container
        as="section"
        id="duvidas"
        maxW="breakpoint-2xl"
        px={{ base: 6, md: 10 }}
        pb="12"
        pt="3"
      >
        <Grid templateColumns={{ base: '1fr', md: '1fr 1.1fr' }} gap="7">
          <Box pt="4">
            <Eyebrow>Dúvidas frequentes</Eyebrow>
            <Heading as="h2" fontSize="28px">
              Ainda tem dúvidas?
            </Heading>
            <Text color="brand.slate" fontSize="14px" mt="3">
              Confira as respostas para as perguntas mais comuns.
            </Text>
          </Box>

          <Accordion.Root
            collapsible
            defaultValue={['0']}
            variant="outline"
            bg="white"
            borderColor="slate.100"
            rounded="lg"
          >
            {questions.map((question, index) => (
              <Accordion.Item key={question.title} value={index.toString()}>
                <Accordion.ItemTrigger
                  fontSize="xs"
                  fontWeight="semibold"
                  px="4"
                  py="3"
                >
                  {question.title}
                  <Accordion.ItemIndicator ml="auto" />
                </Accordion.ItemTrigger>
                <Accordion.ItemContent>
                  <Accordion.ItemBody
                    color="brand.slate"
                    fontSize="xs"
                    px="4"
                    pt="0"
                  >
                    {question.answer}
                  </Accordion.ItemBody>
                </Accordion.ItemContent>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </Grid>
      </Container>

      <Footer />
    </Box>
  )
}
