import './landing.page.css'

import {
  Accordion,
  Box,
  Container,
  Flex,
  For,
  Grid,
  Heading,
  Text,
} from '@chakra-ui/react'
import { motion, useReducedMotion } from 'motion/react'

import BackToTopButton from '../components/back-to-top-button'
import Banner from '../components/banner'
import BookingLinkGuide from '../components/booking-link-guide'
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
  const prefersReducedMotion = useReducedMotion()

  return (
    <Box
      bg="white"
      color="brand.navy"
      fontFamily="Inter, Geist, Arial, sans-serif"
      id="inicio"
      tabIndex={-1}
      data-agendros-landing
      css={{
        '& h1, & h2, & h3': {
          fontFamily: 'inherit',
          letterSpacing: '-0.035em',
        },
        '& section': {
          scrollMarginTop: '32px',
        },
        '& a': {
          textDecoration: 'none',
        },
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
          asChild
          templateColumns={{ base: '1fr 1fr', md: 'repeat(4, 1fr)' }}
          py="9"
          gap="7"
        >
          <motion.div
            initial={prefersReducedMotion ? false : { y: 6 }}
            whileInView={prefersReducedMotion ? undefined : { y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
          >
            <For each={featuresLandingPage}>
              {({ icon: Icon, title, text }) => (
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
              )}
            </For>
          </motion.div>
        </Grid>

        <SessionSummary />
        <BookingLinkGuide />
      </Container>

      <SessionDetails />
      <SessionInfo />

      <Planns />

      <Container
        as="section"
        id="duvidas"
        maxW="breakpoint-2xl"
        px={{ base: 6, md: 10 }}
        pb="12"
        pt="3"
      >
        <Grid
          templateColumns={{ base: '1fr', md: '0.85fr 1.15fr' }}
          gap={{ base: '6', md: '8', lg: '12' }}
        >
          <Box pt={{ base: '0', md: '4' }}>
            <Eyebrow>Dúvidas frequentes</Eyebrow>
            <Heading
              as="h2"
              color="brand.navy"
              fontSize={{ base: '28px', md: '34px', lg: '38px' }}
              lineHeight="short"
            >
              Ainda tem dúvidas?
            </Heading>
            <Text
              color="brand.slate"
              fontSize={{ base: 'sm', md: 'md' }}
              lineHeight="tall"
              mt="3"
            >
              Saiba como ativar o teste, pagar a assinatura e usar a Agendros.
            </Text>
          </Box>

          <Accordion.Root
            collapsible
            defaultValue={['0']}
            variant="plain"
            display="grid"
            gap="3"
          >
            <For each={questions}>
              {(question, index) => (
                <Accordion.Item
                  key={question.title}
                  value={index.toString()}
                  bg="white"
                  borderWidth="1px"
                  borderColor="slate.200"
                  rounded="xl"
                  _open={{ bg: 'sea.50', borderColor: 'sea.300' }}
                >
                  <Accordion.ItemTrigger
                    minH={{ base: '14', lg: '16' }}
                    px={{ base: '4', md: '5' }}
                    py="3"
                    rounded="xl"
                    color="brand.navy"
                    fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}
                    fontWeight="semibold"
                    lineHeight="short"
                    transition="background-color 150ms ease-out"
                    _hover={{ bg: 'slate.50' }}
                    _open={{ bg: 'sea.50' }}
                    _focusVisible={{
                      outline: '2px solid',
                      outlineColor: 'sea.800',
                      outlineOffset: '2px',
                    }}
                  >
                    {question.title}
                    <Accordion.ItemIndicator
                      display="grid"
                      placeItems="center"
                      flexShrink="0"
                      boxSize="7"
                      ml="auto"
                      rounded="full"
                      bg="slate.100"
                      color="brand.slate"
                      _open={{ bg: 'sea.100', color: 'sea.800' }}
                      css={{ _motionReduce: { transition: 'none' } }}
                    />
                  </Accordion.ItemTrigger>
                  <Accordion.ItemContent
                    css={{
                      _open: { _motionReduce: { animationName: 'none' } },
                      _closed: { _motionReduce: { animationName: 'none' } },
                    }}
                  >
                    <Accordion.ItemBody
                      color="brand.slate"
                      fontSize={{ base: 'sm', md: 'md' }}
                      lineHeight="tall"
                      maxW="65ch"
                      px={{ base: '4', md: '5' }}
                      pt="0"
                      pb="4"
                    >
                      {question.answer}
                    </Accordion.ItemBody>
                  </Accordion.ItemContent>
                </Accordion.Item>
              )}
            </For>
          </Accordion.Root>
        </Grid>
      </Container>

      <Footer />
      <BackToTopButton />
    </Box>
  )
}
