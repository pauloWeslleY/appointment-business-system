import { Box, Container, Flex, Grid, Heading, Text } from '@chakra-ui/react'
import { ChevronRight } from 'lucide-react'

import { steps } from '../constants/data-landing-page'
import Eyebrow from './evebrow'

const SessionInfo = () => {
  return (
    <Container
      as="section"
      id="como-funciona"
      maxW="breakpoint-2xl"
      px={{ base: 6, md: 10 }}
      py="9"
    >
      <Eyebrow>Como funciona</Eyebrow>

      <Heading as="h2" fontSize="30px">
        Comece em poucos minutos.
      </Heading>
      <Text color="brand.slate" fontSize="14px" mt="2">
        É simples, rápido e sem complicação.
      </Text>
      <Grid
        templateColumns={{ base: '1fr 1fr', md: 'repeat(4, 1fr)' }}
        gap="7"
        mt="7"
      >
        {steps.map(({ icon: Icon, title, text }, index) => (
          <Box key={title} textAlign="center" position="relative">
            <Flex
              rounded="full"
              w="62px"
              h="62px"
              bg="sea.50"
              color="sea.700"
              mx="auto"
              align="center"
              justify="center"
              mb="4"
            >
              <Icon size={30} />
            </Flex>
            {index < 3 && (
              <Box
                position="absolute"
                right="-20px"
                top="25px"
                color="slate.400"
                display={{ base: 'none', md: 'block' }}
              >
                <ChevronRight size={18} />
              </Box>
            )}
            <Heading as="h3" fontSize="15px" mb="2">
              {title}
            </Heading>
            <Text color="brand.slate" fontSize="14px" maxW="220px" mx="auto">
              {text}
            </Text>
          </Box>
        ))}
      </Grid>
    </Container>
  )
}

export default SessionInfo
