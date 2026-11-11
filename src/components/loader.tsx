import { Spinner, type StackProps, Text, VStack } from '@chakra-ui/react'

interface LoaderProps extends StackProps {
  message?: string
}

const Loader = ({ message = 'Carregando...', ...props }: LoaderProps) => {
  return (
    <VStack
      role="status"
      aria-busy="true"
      align="center"
      justify="center"
      colorPalette="app"
      h={{ base: 'sm', md: 'xl', xl: 'dvh' }}
      {...props}
    >
      <Spinner
        aria-hidden="true"
        color={{ _light: 'colorPalette.600', _dark: 'colorPalette.300' }}
      />
      <Text color={{ _light: 'colorPalette.600', _dark: 'colorPalette.300' }}>
        {message}
      </Text>
    </VStack>
  )
}

export default Loader
