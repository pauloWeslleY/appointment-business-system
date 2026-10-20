import { Box, type BoxProps } from '@chakra-ui/react'

export function GeometricBackground(props: BoxProps) {
  return (
    <Box
      position="absolute"
      inset="0"
      overflow="hidden"
      pointerEvents="none"
      aria-hidden="true"
      {...props}
    >
      {/* Círculo superior */}
      <Box
        position="absolute"
        top="-180px"
        left="30%"
        w="420px"
        h="420px"
        borderRadius="full"
        bg="brand.mint"
      />

      {/* Elipse roxa */}
      <Box
        position="absolute"
        top="15%"
        right="-180px"
        w="550px"
        h="380px"
        borderRadius="full"
        bg="brand.navy"
        transform="rotate(-35deg)"
      />

      {/* Círculo turquesa */}
      <Box
        position="absolute"
        bottom="-180px"
        left="-140px"
        w="400px"
        h="400px"
        borderRadius="full"
        bg="brand.sea"
        opacity="0.65"
      />

      {/* Elipse inferior */}
      <Box
        position="absolute"
        bottom="-140px"
        right="10%"
        w="480px"
        h="260px"
        borderRadius="full"
        bg="brand.navy"
        transform="rotate(30deg)"
      />
    </Box>
  )
}
