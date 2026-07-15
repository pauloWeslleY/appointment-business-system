import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import { Link } from '@tanstack/react-router'

import { colorDefaultTheme } from '@/shared/constants/color-default-theme'

const NotFoundPage = () => {
  return (
    <Flex as="section" minH="lg" align="center" justify="center">
      <Box textAlign="center" py="10" px="6">
        <Heading
          as="h2"
          display="inline-block"
          size="4xl"
          bgGradient="to-r"
          gradientTo="colorPalette.400"
          gradientFrom="colorPalette.600"
          backgroundClip="text"
          pr="2"
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
        >
          <Link to="/">Voltar para a página inicial</Link>
        </Button>
      </Box>
    </Flex>
  )
}

export default NotFoundPage
