import { Text } from '@chakra-ui/react'

const Eyebrow = ({ children }: { children: React.ReactNode }) => {
  return (
    <Text
      display="inline-block"
      bg="slate.100"
      color="brand.slate"
      rounded="full"
      px="4"
      py="1"
      fontSize="10px"
      fontWeight="700"
      textTransform="uppercase"
      mb="3"
    >
      {children}
    </Text>
  )
}

export default Eyebrow
