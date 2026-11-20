import {
  Box,
  Button,
  Container,
  Flex,
  For,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Text,
} from '@chakra-ui/react'
import { FaWhatsapp } from 'react-icons/fa'

import { landingSetupHelpWhatsAppHref } from '../constants/data-landing-page'
import { planBenefits, plans } from '../constants/data-plans'
import Eyebrow from './evebrow'
import PlanCard from './plan-card'

const Plans = () => {
  return (
    <Container
      as="section"
      id="planos"
      maxW="breakpoint-2xl"
      px={{ base: 6, md: 10 }}
      py="9"
    >
      <Eyebrow>Planos</Eyebrow>
      <Heading
        as="h2"
        color="brand.navy"
        fontSize={{ base: '28px', md: '34px' }}
      >
        Um plano, duas formas de pagar
      </Heading>
      <Text fontSize={{ base: 'sm', md: 'md' }} color="brand.slate" mt="2">
        Escolha a cobrança mensal ou anual. O plano inclui os mesmos recursos
        nas duas opções.
      </Text>

      <Grid
        templateColumns={{
          base: '1fr',
          xl: 'minmax(0, 2fr) minmax(220px, 1fr)',
        }}
        gap={{ base: '8', xl: '10' }}
        pt="7"
      >
        <GridItem minW="0">
          <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
            <For each={plans}>
              {(plan) => <PlanCard key={plan.type} plan={plan} />}
            </For>
          </SimpleGrid>

          <Flex mt="5" gap="3" align="center" wrap="wrap">
            <Text color="brand.slate" fontSize="sm">
              Quer ajuda para configurar a agenda do seu negócio?
            </Text>
            <Button
              asChild
              variant="outline"
              rounded="lg"
              borderColor="slate.200"
              color="brand.navy"
              transition="background-color 150ms ease-out"
              _hover={{ bg: 'slate.50' }}
              _active={{ bg: 'slate.100' }}
            >
              <a
                href={landingSetupHelpWhatsAppHref}
                target="_blank"
                rel="noreferrer"
              >
                <FaWhatsapp aria-hidden="true" />
                Pedir ajuda pelo WhatsApp
              </a>
            </Button>
          </Flex>
        </GridItem>

        <GridItem spaceY="4">
          <Heading as="h3" color="brand.navy" fontSize="xl">
            O que está incluído
          </Heading>
          <For each={planBenefits}>
            {(planBenefit) => (
              <HStack key={planBenefit.title} gap="3">
                <Flex
                  align="center"
                  justify="center"
                  boxSize="11"
                  flexShrink="0"
                  rounded="full"
                  bg="sea.50"
                  color="sea.800"
                >
                  <Icon as={planBenefit.icon} boxSize="5" />
                </Flex>
                <Box>
                  <Text color="brand.navy" fontWeight="semibold">
                    {planBenefit.title}
                  </Text>
                  <Text fontSize="sm" color="brand.slate">
                    {planBenefit.description}
                  </Text>
                </Box>
              </HStack>
            )}
          </For>
        </GridItem>
      </Grid>
    </Container>
  )
}

export default Plans
