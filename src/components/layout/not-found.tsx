import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react'
import { Link } from '@tanstack/react-router'

import { authClient } from '@/lib/auth'
import { colorDefaultTheme } from '@/shared/constants/color-default-theme'
import { cardSectionCss } from '@/theme/styles/global-styles'

const NotFoundPage = () => {
  const { data } = authClient.useSession()

  return (
    <Flex as="section" minH="lg" align="center" justify="center">
      <Container maxW="container.lg" pt="20">
        <Box w="full" textAlign="center" py="10" px="6" css={cardSectionCss}>
          <Image src="/not-found.svg" alt="Logo não encontrado" mx="auto" />

          <Heading
            as="h2"
            display="inline-block"
            size="6xl"
            bgGradient="to-r"
            gradientTo="colorPalette.400"
            gradientFrom="colorPalette.600"
            backgroundClip="text"
          >
            404
          </Heading>

          <Text color="gray.500" mb="6">
            A página que você está procurando não existe.
          </Text>

          <Button
            asChild
            colorPalette={colorDefaultTheme}
            variant="surface"
            rounded="lg"
            size="xs"
          >
            <Link to={data?.user ? '/establishment' : '/'}>
              Voltar para a página inicial
            </Link>
          </Button>
        </Box>
      </Container>
    </Flex>
  )
}

export default NotFoundPage
