import { Box, Grid, Heading, HStack, Stack, Text } from '@chakra-ui/react'

import { reference } from '../constants/data-landing-page'
import {
  featuresLandingPage,
  listFeaturesLandingPage,
} from '../constants/features'
import Eyebrow from './evebrow'
import SignupButton from './signup-button'

const SessionSummary = () => {
  return (
    <Grid
      as="section"
      id="recursos"
      templateColumns={{ base: '1fr', md: '1fr 1.1fr' }}
      gap="7"
      alignItems="center"
      pb="10"
      pt="3"
    >
      <Box>
        <Eyebrow>Plataforma completa</Eyebrow>
        <Heading
          as="h2"
          fontSize={{ base: '28px', md: '32px' }}
          lineHeight="1.15"
          maxW="390px"
        >
          Tudo o que você precisa
          <br />
          em um só lugar.
        </Heading>
        <Text color="brand.slate" fontSize="14px" mt="3" maxW="400px">
          Do agendamento ao pagamento, o System Appointment centraliza a gestão
          do seu negócio de forma prática e eficiente.
        </Text>

        <Stack gap="3" my="6">
          {listFeaturesLandingPage.map((text, index) => {
            const Icon =
              featuresLandingPage[index % featuresLandingPage.length].icon
            return (
              <HStack key={text} color="brand.slate" fontSize="14px">
                <Box bg="sea.50" color="sea.700" rounded="sm" p="1">
                  <Icon size={18} />
                </Box>
                {text}
              </HStack>
            )
          })}
        </Stack>

        <SignupButton>Conhecer todos os recursos</SignupButton>
      </Box>

      <Box
        role="img"
        aria-label="Profissional usando tablet, com cartões de próximo agendamento, crescimento e receita"
        aspectRatio="1.18"
        backgroundImage={`url("${reference}")`}
        backgroundSize="193% auto"
        backgroundPosition="96% 30.5%"
        backgroundRepeat="no-repeat"
      />
    </Grid>
  )
}

export default SessionSummary
