import {
  Button,
  Container,
  Flex,
  HStack,
  Image,
  Link,
  Stack,
} from '@chakra-ui/react'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

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
        <Link href="/" aria-label="System Appointment — início">
          <Image
            src="/logo/logo-horizontal-light.svg"
            alt="System Appointment"
            w="170px"
          />
        </Link>
        <HStack
          gap="7"
          display={{ base: 'none', md: 'flex' }}
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

        <HStack gap="3" display={{ base: 'none', md: 'flex' }}>
          <Button
            asChild
            variant="outline"
            transition="colors"
            color={{ base: 'slate.700', _hover: 'sea.400' }}
            borderColor="slate.200"
            size="sm"
            rounded="md"
          >
            <Link href="/login">Entrar</Link>
          </Button>

          <Button asChild bg="brand.navy" color="white" size="sm" rounded="md">
            <Link href="/register">Criar conta</Link>
          </Button>
        </HStack>

        <Button
          display={{ md: 'none' }}
          variant="ghost"
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
            p="6"
            shadow="lg"
            zIndex="10"
            rounded="lg"
          >
            {navigation.map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setMenuOpen(false)}>
                {label}
              </Link>
            ))}
            <Link href="/login">Entrar</Link>
            <SignupButton>Criar conta</SignupButton>
          </Stack>
        )}
      </Flex>
    </Container>
  )
}

export default NavBarLandingPage
