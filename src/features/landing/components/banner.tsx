import {
  Box,
  Button,
  Container,
  Flex,
  For,
  Grid,
  Heading,
  HStack,
  Image,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Check, CirclePlay } from 'lucide-react'
import {
  motion,
  useAnimationControls,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'motion/react'
import { useEffect, useRef } from 'react'
import { FaWhatsapp } from 'react-icons/fa'

import {
  backToTopScrollThreshold,
  landingWhatsAppHref,
} from '../constants/data-landing-page'
import SignupButton from './signup-button'

const trialList = [
  'Crie sua conta e ative o teste sem cartão de crédito.',
  'Sem cobrança automática ao fim do teste.',
]

const Banner = () => {
  const prefersReducedMotion = useReducedMotion()
  const bannerImageAnimation = useAnimationControls()
  const hasScrolledDown = useRef(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    if (prefersReducedMotion) {
      bannerImageAnimation.stop()
      bannerImageAnimation.set({ y: 0 })
      return
    }

    void bannerImageAnimation.start({ y: 0 })
  }, [bannerImageAnimation, prefersReducedMotion])

  useMotionValueEvent(scrollY, 'change', (pageScrollOffset) => {
    if (pageScrollOffset > backToTopScrollThreshold) {
      hasScrolledDown.current = true
    }

    if (pageScrollOffset > 1 || !hasScrolledDown.current) {
      return
    }

    hasScrolledDown.current = false

    if (!prefersReducedMotion) {
      bannerImageAnimation.set({ y: 8 })
      void bannerImageAnimation.start({ y: 0 })
    }
  })

  return (
    <Box
      overflow="hidden"
      bg="linear-gradient(120deg, white 35%, #f1fafc 100%)"
    >
      <Container maxW="breakpoint-2xl" px={{ base: 6, md: 10 }}>
        <Grid
          templateColumns={{ base: '1fr', md: '0.95fr 1.15fr' }}
          alignItems="center"
          minH={{ md: '520px' }}
          gap={{ base: 6, md: 0 }}
        >
          <Box py={{ base: 10, md: 12 }} zIndex="1">
            <Heading
              as="h1"
              fontSize={{ base: '38px', lg: '48px' }}
              lineHeight="1.08"
              fontWeight="800"
              maxW="460px"
            >
              Sistema de agendamento online{' '}
              <Box as="span" color="sea.500">
                para empresas de serviços
              </Box>
            </Heading>

            <Text
              color="brand.slate"
              fontSize="15px"
              lineHeight="1.6"
              maxW="360px"
              mt="5"
              mb="6"
            >
              Seus clientes escolhem um horário pelo seu link. Você acompanha os
              agendamentos da equipe em uma só agenda.
            </Text>

            <Flex gap="3" wrap="wrap">
              <SignupButton>Testar grátis por 7 dias</SignupButton>

              <Button
                rounded="lg"
                asChild
                variant="outline"
                borderColor="slate.200"
                color="brand.slate"
                h="11"
                transition="background-color 150ms ease-out"
                _hover={{ bg: 'slate.100' }}
                _active={{ bg: 'slate.200' }}
              >
                <Link
                  href={landingWhatsAppHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaWhatsapp size={17} />
                  Falar pelo WhatsApp
                </Link>
              </Button>
            </Flex>

            <Stack gap="2" mt="5" color="brand.slate" fontSize="12px">
              <For each={trialList}>
                {(trialBenefit) => (
                  <HStack key={trialBenefit} gap="2">
                    <Box rounded="full" bg="sea.600" color="white" p="0.5">
                      <Check size={10} />
                    </Box>
                    {trialBenefit}
                  </HStack>
                )}
              </For>
            </Stack>

            <Link
              href="#como-funciona"
              mt="4"
              color="brand.slate"
              fontSize="sm"
            >
              <CirclePlay size={17} />
              Ver como funciona
            </Link>
          </Box>

          <Image asChild w="full" h="auto" objectFit="contain">
            <motion.img
              src="/banner.png"
              alt="Sistema Agendros"
              initial={prefersReducedMotion ? false : { y: 8 }}
              animate={bannerImageAnimation}
              transition={{ duration: 0.36, ease: 'easeOut' }}
            />
          </Image>
        </Grid>
      </Container>
    </Box>
  )
}

export default Banner
