import {
  Box,
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
import { Gift } from 'lucide-react'

import { plans, summayPlans } from '../constants/data-plans'
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
      <Box>
        <Heading as="h2" fontSize="28px">
          Escolha o plano ideal para o seu negócio.
        </Heading>
        <Text fontSize="13px" color="brand.slate" mt="2">
          Todos os planos incluem os recursos essenciais. Cancele quando quiser.
        </Text>
      </Box>

      <Grid
        templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
        gap="10"
        py="8"
      >
        <GridItem placeContent="center" spaceY="4">
          <For each={summayPlans}>
            {(plan, index) => (
              <HStack key={index} gap={{ base: '2', md: '4' }}>
                <Flex placeContent="center" p="4" rounded="full" bg="purple.50">
                  <Icon as={plan.icon} boxSize="6" color="purple.600" />
                </Flex>

                <Box>
                  <Text fontSize="lg" fontWeight="bold">
                    {plan.title}
                  </Text>
                  <Text fontSize="sm" color="gray.400">
                    {plan.description}
                  </Text>
                </Box>
              </HStack>
            )}
          </For>
        </GridItem>

        <GridItem asChild w="full">
          <SimpleGrid columns={{ base: 1, lg: 2 }} gap="2" w="full">
            {plans.map((plan, index) => (
              <PlanCard key={index} plan={plan} index={index} />
            ))}
          </SimpleGrid>

          <Flex
            mt="4"
            align="center"
            gap="4"
            colorPalette="green"
            p="4"
            bg="green.100/40"
            rounded="xl"
          >
            <Icon as={Gift} boxSize="10" color="colorPalette.800" />

            <Box>
              <Text color="colorPalette.900" fontSize="xl" fontWeight="bold">
                3 dias grátis
              </Text>
              <Text color="gray.600">
                Teste todos os recurso s sem cartão de crédito.
              </Text>
            </Box>
          </Flex>
        </GridItem>
      </Grid>
    </Container>
  )
}

export default Plans
