import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Image,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react'
import { ArrowRight } from 'lucide-react'

import { navigation } from '../constants/data-landing-page'

const Footer = () => {
  return (
    <Box as="footer" bg="brand.navy" color="white" pt="7" pb="4">
      <Container maxW="breakpoint-2xl" px={{ base: 6, md: 10 }}>
        <Grid
          templateColumns={{ base: '1fr 1fr', md: '1.5fr 0.75fr 0.9fr 1fr' }}
          gap="7"
          pb="7"
        >
          <Box>
            <Image
              src="/logo/logo-horizontal-monochrome-white.svg"
              alt="System Appointment"
              w="160px"
              mb="3"
            />
            <Text fontSize="12px" color="navy.200">
              Mais organização para o seu negócio.
              <br />
              Mais tempo para o que importa.
            </Text>
          </Box>

          <Box>
            <Text fontSize="12px" fontWeight="600" mb="3">
              Produto
            </Text>
            <Stack gap="1" fontSize="11px" color="navy.200">
              {navigation.map(([label, href]) => (
                <Link key={href} href={href}>
                  {label}
                </Link>
              ))}
            </Stack>
          </Box>

          <Box>
            <Text fontSize="12px" fontWeight="600" mb="3">
              Institucional
            </Text>
            <Stack gap="1" fontSize="11px" color="navy.200">
              <Link href="#recursos">Sobre nós</Link>
              <Link href="/register">Criar sua conta</Link>
              <Link href="/login">Acessar plataforma</Link>
            </Stack>
          </Box>

          <Box>
            <Text fontSize="12px" fontWeight="600" mb="3">
              Seu negócio mais organizado
            </Text>
            <Text fontSize="11px" color="navy.200" mb="3">
              Comece a transformar sua rotina.
            </Text>
            <Button asChild size="sm" bg="brand.mint" color="brand.navy">
              <Link href="/register">
                Experimente grátis
                <ArrowRight size={14} />
              </Link>
            </Button>
          </Box>
        </Grid>

        <Flex
          justify="space-between"
          gap="4"
          borderTopWidth="1px"
          borderColor="whiteAlpha.200"
          pt="4"
          fontSize="10px"
          color="navy.200"
        >
          <Text>
            © {new Date().getFullYear()} System Appointment. Todos os direitos
            reservados.
          </Text>
          <Text whiteSpace="nowrap">🇧🇷 Português (BR)</Text>
        </Flex>
      </Container>
    </Box>
  )
}

export default Footer
