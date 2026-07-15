import { Spinner, Text, VStack } from '@chakra-ui/react'

import { colorDefaultTheme } from '@/shared/constants/color-default-theme'

const PageLoader = () => {
  return (
    <VStack
      align="center"
      justify="center"
      colorPalette={colorDefaultTheme}
      h={{ base: 'auto', md: 'xl', xl: 'dvh' }}
    >
      <Spinner color="colorPalette.600" />
      <Text color="colorPalette.600">Loading...</Text>
    </VStack>
  )
}

export default PageLoader
