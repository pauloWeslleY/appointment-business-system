import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Check, CirclePlay } from 'lucide-react'

import { reference } from '../constants/data-landing-page'
import SignupButton from './signup-button'

const trialList = [
  'Teste grátis por 7 dias',
  'Sem cartão de crédito',
  'Cancelamento a qualquer momento',
]

const Banner = () => {
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
            <Text
              display="inline-block"
              rounded="full"
              bg="slate.100"
              color="brand.slate"
              fontSize="11px"
              fontWeight="600"
              px="4"
              py="1"
              mb="4"
            >
              Gestão de agendamentos para o seu negócio
            </Text>

            <Heading
              as="h1"
              fontSize={{ base: '38px', lg: '48px' }}
              lineHeight="1.08"
              fontWeight="800"
              maxW="460px"
            >
              Mais tempo para
              <br />o que realmente
              <br />
              <Box as="span" color="sea.500">
                importa.
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
              Organize seus agendamentos, gerencie clientes, sua equipe e faça
              seu negócio crescer com uma plataforma simples, completa e
              moderna.
            </Text>

            <Flex gap="3" wrap="wrap">
              <SignupButton />

              <Button
                asChild
                variant="outline"
                borderColor="slate.200"
                color="brand.slate"
                h="11"
              >
                <Link href="#como-funciona">
                  <CirclePlay size={17} />
                  Ver como funciona
                </Link>
              </Button>
            </Flex>

            <Stack gap="2" mt="5" color="brand.slate" fontSize="12px">
              {trialList.map((text) => (
                <HStack key={text} gap="2">
                  <Box rounded="full" bg="sea.600" color="white" p="0.5">
                    <Check size={10} />
                  </Box>
                  {text}
                </HStack>
              ))}
            </Stack>
          </Box>

          <Box
            role="img"
            aria-label="System Appointment em computador e celular, com calendário de agendamentos"
            w={{ base: '100%', md: '660px' }}
            aspectRatio="1.2"
            backgroundImage={`url("${reference}")`}
            backgroundSize="177% auto"
            backgroundPosition="100% 3.5%"
            backgroundRepeat="no-repeat"
            alignSelf="end"
          />
        </Grid>
      </Container>
    </Box>
  )
}

export default Banner
