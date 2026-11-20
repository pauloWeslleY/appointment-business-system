import {
  Box,
  Container,
  Flex,
  For,
  Grid,
  Heading,
  Text,
} from '@chakra-ui/react'
import { ChevronRight } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

import { steps } from '../constants/data-landing-page'
import Eyebrow from './evebrow'

const SessionInfo = () => {
  const prefersReducedMotion = useReducedMotion()

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
        Da criação da conta ao primeiro agendamento
      </Heading>
      <Text color="brand.slate" fontSize="14px" mt="2">
        Configure sua agenda e compartilhe o link com seus clientes.
      </Text>
      <Grid
        templateColumns={{ base: '1fr 1fr', md: 'repeat(4, 1fr)' }}
        gap="7"
        mt="7"
      >
        <For each={steps}>
          {({ icon: Icon, title, text }, index) => (
            <Box key={title} textAlign="center" position="relative">
              <Flex
                asChild
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
                <motion.div
                  whileInView={
                    prefersReducedMotion ? undefined : { scale: [1, 1.07, 1] }
                  }
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.36, ease: 'easeInOut' }}
                >
                  <Icon size={30} />
                </motion.div>
              </Flex>
              {index < steps.length - 1 && (
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
          )}
        </For>
      </Grid>
    </Container>
  )
}

export default SessionInfo
