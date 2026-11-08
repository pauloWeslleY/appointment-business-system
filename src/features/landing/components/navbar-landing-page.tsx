import { Button, Container, Flex, HStack, Link, Stack } from '@chakra-ui/react'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

import Logotipo from '@/components/logotipo'
import { getAdminHref, getCustomerHref } from '@/shared/config/site-domains'

import { navigation } from '../constants/data-landing-page'
import SignupButton from './signup-button'

const NavBarLandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <Container maxW="breakpoint-2xl" px={{ base: 6, md: 10 }}>
      <Flex
        as="header"
        align="center"
        justify="space-between"
        py="5"
        gap="6"
        position="relative"
      >
        <Link href="/" aria-label="Agendros — início" flexShrink="0">
          <Logotipo variant="horizontal" theme="light" w="170px" h="auto" />
        </Link>
        <HStack
          gap="7"
          display={{ base: 'none', lg: 'flex' }}
          fontSize="md"
          color="brand.slate"
        >
          {navigation.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              color="brand.slate"
              transition="colors"
              _hover={{ color: 'sea.700' }}
            >
              {label}
            </Link>
          ))}
        </HStack>

        <HStack gap="3" display={{ base: 'none', lg: 'flex' }}>
          <Button asChild variant="ghost" color="brand.navy" size="sm" rounded="lg"><Link href={getCustomerHref()}>Área do cliente</Link></Button>
          <Button
            asChild
            variant="outline"
            transition="colors"
            color={{ base: 'slate.700', _hover: 'sea.400' }}
            borderColor="slate.200"
            size="sm"
            rounded="lg"
          >
            <Link href={getAdminHref('/login')}>Área empresarial</Link>
          </Button>

          <Button asChild bg="brand.navy" color="white" size="sm" rounded="lg">
            <Link href={getAdminHref('/register')}>Criar conta</Link>
          </Button>
        </HStack>

        <Button
          rounded="lg"
          display={{ lg: 'none' }}
          variant="ghost"
          color="brand.slate"
          _hover={{ bg: 'brand.mint', color: 'sea.700' }}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </Button>

        {menuOpen && (
          <Stack
            position="absolute"
            top="100%"
            insetX="0"
            bg="white"
            color="brand.slate"
            p="6"
            shadow="lg"
            zIndex="10"
            rounded="lg"
          >
            {navigation.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                color="brand.slate"
                _hover={{ color: 'sea.700' }}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            <Link
              href={getAdminHref('/login')}
              color="brand.slate"
              _hover={{ color: 'sea.700' }}
            >
              Área empresarial
            </Link>
            <Button asChild variant="outline" color="brand.navy" rounded="lg"><Link href={getCustomerHref()}>Área do cliente</Link></Button>
            <SignupButton>Criar conta</SignupButton>
          </Stack>
        )}
      </Flex>
    </Container>
  )
}

export default NavBarLandingPage
