import { Box } from '@chakra-ui/react'

import {
  pageBackgroundBottomShapeCss,
  pageBackgroundShapesCss,
  pageBackgroundSideShapeCss,
  pageBackgroundTopShapeCss,
} from './define-styles'

const BackgroundShapes = () => {
  return (
    <Box aria-hidden="true" css={pageBackgroundShapesCss}>
      <Box css={pageBackgroundTopShapeCss} />
      <Box css={pageBackgroundSideShapeCss} />
      <Box css={pageBackgroundBottomShapeCss} />
    </Box>
  )
}

export default BackgroundShapes
