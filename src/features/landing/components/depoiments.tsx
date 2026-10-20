import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  Text,
} from '@chakra-ui/react'
import { ChevronRight, Star } from 'lucide-react'
import { useState } from 'react'

import { testimonials } from '../constants/data-landing-page'
import Eyebrow from './evebrow'

const Depoiments = () => {
  const [testimonialOffset, setTestimonialOffset] = useState(0)

  const handleNext = (direction: number) => {
    const testimonialsSize = testimonials.length
    setTestimonialOffset(
      (testimonialOffset + direction + testimonialsSize) % testimonialsSize,
    )
  }

  const getLabelDepoiment = (direction: number) => {
    return direction === -1 ? 'Depoimento anterior' : 'Próximo depoimento'
  }

  return (
    <Box as="section" id="depoimentos" bg="#f5fafc" py="8">
      <Container maxW="breakpoint-2xl" px={{ base: 6, md: 10 }}>
        <Eyebrow>Depoimentos</Eyebrow>
        <Flex align="center" justify="space-between" gap="4">
          <Heading as="h2" fontSize="28px" lineHeight="1.15">
            Profissionais que
            <br />
            confiam no System Appointment.
          </Heading>

          <HStack>
            {[-1, 1].map((direction) => (
              <Button
                key={direction}
                size="sm"
                bg="white"
                borderWidth="1px"
                borderColor="slate.100"
                aria-label={getLabelDepoiment(direction)}
                onClick={() => handleNext(direction)}
              >
                <ChevronRight
                  size={16}
                  style={{
                    transform: direction === -1 ? 'rotate(180deg)' : undefined,
                  }}
                />
              </Button>
            ))}
          </HStack>
        </Flex>

        <Text color="brand.slate" fontSize="14px" mt="3" mb="5">
          Veja o que nossos clientes dizem sobre a experiência de usar a
          plataforma.
        </Text>

        <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap="4">
          {testimonials.map((_, index) => {
            const item =
              testimonials[(index + testimonialOffset) % testimonials.length]

            return (
              <Box
                key={item.name}
                bg="white"
                borderWidth="1px"
                borderColor="slate.100"
                rounded="lg"
                p="5"
              >
                <HStack gap="3">
                  <Flex
                    w="40px"
                    h="40px"
                    rounded="full"
                    bg={index === 1 ? 'slate.100' : 'brand.mint'}
                    color="brand.slate"
                    fontSize="13px"
                    fontWeight="700"
                    align="center"
                    justify="center"
                  >
                    {item.initials}
                  </Flex>
                  <Box>
                    <Text fontWeight="700" fontSize="13px">
                      {item.name}
                    </Text>
                    <Text color="brand.slate" fontSize="11px">
                      {item.role}
                    </Text>
                  </Box>
                </HStack>
                <HStack
                  color="#efa624"
                  gap="0.5"
                  mt="3"
                  mb="2"
                  aria-label="5 de 5 estrelas"
                >
                  {Array.from({ length: 5 }, (_, star) => (
                    <Star key={star} size={14} fill="currentColor" />
                  ))}
                </HStack>
                <Text color="brand.slate" fontSize="13px" lineHeight="1.7">
                  “{item.quote}”
                </Text>
              </Box>
            )
          })}
        </Grid>
      </Container>
    </Box>
  )
}

export default Depoiments
