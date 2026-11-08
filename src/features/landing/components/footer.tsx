import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react'
import { ArrowRight } from 'lucide-react'

import Logotipo from '@/components/logotipo'
import { getAdminHref, getCustomerHref } from '@/shared/config/site-domains'

import { navigation } from '../constants/data-landing-page'

const yearFooter = new Date().getFullYear()

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
            <Logotipo
              variant="horizontal"
              theme="dark"
              w="160px"
              h="auto"
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
            <Stack gap="1" fontSize="xs">
              {navigation.map(([label, href]) => (
                <Link key={href} href={href} color="navy.200">
                  {label}
                </Link>
              ))}
            </Stack>
          </Box>

          <Box>
            <Text fontSize="12px" fontWeight="600" mb="3">
              Institucional
            </Text>
            <Stack gap="1" fontSize="xs">
              <Link href="#recursos" color="navy.200">
                Sobre nós
              </Link>
              <Link href={getCustomerHref()} color="navy.200">
                Área do cliente
              </Link>
              <Link href="/terms-of-use" color="navy.200">
                Termos de Uso
              </Link>
              <Link href="/privacy-policy" color="navy.200">
                Política de Privacidade
              </Link>
              <Link href={getAdminHref('/register')} color="navy.200">
                Criar sua conta
              </Link>
              <Link href={getAdminHref('/login')} color="navy.200">
                Acessar plataforma
              </Link>
            </Stack>
          </Box>

          <Box>
            <Text fontSize="12px" fontWeight="600" mb="3">
              Seu negócio mais organizado
            </Text>
            <Text fontSize="11px" color="navy.200" mb="3">
              Comece a transformar sua rotina.
            </Text>
            <Button
              rounded="lg"
              asChild
              size="sm"
              bg="brand.mint"
              color="brand.navy"
            >
              <Link href={getAdminHref('/register')}>
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
          <Text>© {yearFooter} Agendros. Todos os direitos reservados.</Text>
          <Text>🇧🇷 Português (BR)</Text>
        </Flex>
      </Container>
    </Box>
  )
}

export default Footer
