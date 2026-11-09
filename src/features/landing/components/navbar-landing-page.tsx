import {
  Button,
  Container,
  Flex,
  HStack,
  Link as ChakraLink,
  Stack,
} from '@chakra-ui/react'
import type { LinkProps } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
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
        pos="relative"
      >
        <ChakraLink href="/" aria-label="Agendros — início" flexShrink="0">
          <Logotipo variant="horizontal" theme="light" w="170px" h="auto" />
        </ChakraLink>

        <HStack
          gap="7"
          display={{ base: 'none', lg: 'flex' }}
          fontSize="md"
          color="brand.slate"
        >
          {navigation.map(([label, href]) => (
            <ChakraLink
              key={href}
              href={href}
              color="brand.slate"
              transition="colors"
              _hover={{ color: 'sea.700' }}
            >
              {label}
            </ChakraLink>
          ))}
        </HStack>

        <HStack gap="3" display={{ base: 'none', lg: 'flex' }}>
          <Button
            asChild
            variant="plain"
            color="brand.navy"
            size="sm"
            rounded="lg"
          >
            <Link to={getCustomerHref() as LinkProps['to']}>
              Área do cliente
            </Link>
          </Button>

          <Button
            rounded="lg"
            asChild
            variant="outline"
            borderColor="slate.200"
            color="brand.slate"
            size="sm"
            transition="colors"
            _hover={{ bg: 'slate.100' }}
          >
            <Link to={getAdminHref('/login') as LinkProps['to']}>
              Área empresarial
            </Link>
          </Button>

          <Button asChild bg="brand.navy" color="white" size="sm" rounded="lg">
            <Link to={getAdminHref('/register') as LinkProps['to']}>
              Criar conta
            </Link>
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
              <ChakraLink
                key={href}
                href={href}
                color="brand.slate"
                _hover={{ color: 'sea.700' }}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </ChakraLink>
            ))}

            <Button asChild color="brand.slate" _hover={{ color: 'sea.700' }}>
              <Link to={getAdminHref('/login') as LinkProps['to']}>
                Área empresarial
              </Link>
            </Button>
            <Button asChild variant="outline" color="brand.navy" rounded="lg">
              <Link to={getCustomerHref() as LinkProps['to']}>
                Área do cliente
              </Link>
            </Button>
            <SignupButton>Criar conta</SignupButton>
          </Stack>
        )}
      </Flex>
    </Container>
  )
}

export default NavBarLandingPage
