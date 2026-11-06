import { Spinner, Text, VStack } from '@chakra-ui/react'

const PageLoader = () => {
  return (
    <VStack
      align="center"
      justify="center"
      colorPalette="primary"
      h={{ base: 'auto', md: 'xl', xl: 'dvh' }}
    >
      <Spinner
        color={{ _light: 'colorPalette.600', _dark: 'colorPalette.300' }}
      />
      <Text color={{ _light: 'colorPalette.600', _dark: 'colorPalette.300' }}>
        Carregando...
      </Text>
    </VStack>
  )
}

export default PageLoader
