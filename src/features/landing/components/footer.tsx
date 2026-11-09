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
const mensagem = encodeURIComponent('Olá! Gostaria de mais informações.')

const Footer = () => {
  return (
    <Box as="footer" bg="brand.navy" color="white" pt="7" pb="4">
      <Container maxW="breakpoint-2xl" px={{ base: 6, md: 10 }}>
        <Grid
          templateColumns={{ base: '1fr', md: '1.5fr 0.75fr 0.9fr 1fr' }}
          placeItems={{ base: 'center', md: 'start' }}
          gap="7"
          pb="7"
        >
          <Flex direction="column" align={{ base: 'center', md: 'start' }}>
            <Logotipo
              variant="horizontal"
              theme="dark"
              w="160px"
              h="auto"
              mb="3"
            />
            <Text fontSize="xs" color="navy.200">
              Mais organização para o seu negócio.
              <br />
              Mais tempo para o que importa.
            </Text>
            <Button
              asChild
              variant="plain"
              fontSize="xs"
              color="navy.200"
              px="0"
              mt="2"
            >
              <Link
                href={`https://wa.me/5511958908360?text=${mensagem}`}
                target="_blank"
                rel="noreferrer"
              >
                Fale diretamente com o desenvolvedor.
              </Link>
            </Button>
          </Flex>

          <Box>
            <Text
              fontSize="12px"
              fontWeight="600"
              mb="3"
              textAlign={{ base: 'center', lg: 'initial' }}
            >
              Produto
            </Text>
            <Stack
              gap="1"
              fontSize="xs"
              align={{ base: 'center', lg: 'flex-start' }}
            >
              {navigation.map(([label, href]) => (
                <Link key={href} href={href} color="navy.200">
                  {label}
                </Link>
              ))}
            </Stack>
          </Box>

          <Box textAlign={{ base: 'center', lg: 'initial' }}>
            <Text fontSize="12px" fontWeight="600" mb="3">
              Institucional
            </Text>
            <Stack
              gap="1"
              fontSize="xs"
              align={{ base: 'center', lg: 'flex-start' }}
            >
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
