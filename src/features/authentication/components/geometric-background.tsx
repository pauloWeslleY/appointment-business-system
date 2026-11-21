import { Box, type BoxProps, For } from '@chakra-ui/react'

import { SHAPES } from '../constants/geometrics-form'

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
      <For each={SHAPES}>
        {({ name, ...shapeProps }) => (
          <Box key={name} position="absolute" {...shapeProps} />
        )}
      </For>
    </Box>
  )
}
