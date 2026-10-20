import { Box, Container, Flex, Grid, Heading, Text } from '@chakra-ui/react'

import { benefits } from '../constants/data-landing-page'
import Eyebrow from './evebrow'

const SessionDetails = () => {
  return (
    <Box as="section" bg="linear-gradient(110deg, #eefbfa, #f1fcfc)" py="8">
      <Container maxW="breakpoint-2xl" px={{ base: 6, md: 10 }}>
        <Eyebrow>Por que escolher</Eyebrow>
        <Heading as="h2" fontSize="30px" lineHeight="1.15" mb="6">
          Um sistema feito para a<br />
          realidade dos profissionais.
        </Heading>

        <Grid
          templateColumns={{ base: '1fr 1fr', md: 'repeat(4, 1fr)' }}
          gap="7"
        >
          {benefits.map(({ icon: Icon, title, text }) => (
            <Box key={title}>
              <Flex
                color="sea.800"
                bg="sea.100"
                rounded="xl"
                w="44px"
                h="44px"
                align="center"
                justify="center"
                mb="3"
              >
                <Icon size={25} />
              </Flex>
              <Heading as="h3" fontSize="15px" mb="2">
                {title}
              </Heading>
              <Text color="brand.slate" fontSize="14px" maxW="205px">
                {text}
              </Text>
            </Box>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default SessionDetails
