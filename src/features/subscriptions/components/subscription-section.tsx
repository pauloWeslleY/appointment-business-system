import { Card, type CardRootProps } from '@chakra-ui/react'

import { colorDefaultTheme } from '@/shared/constants/color-default-theme'
import { cardSectionCss } from '@/theme/styles/global-styles'

export function SubscriptionSection(props: CardRootProps) {
  return (
    <Card.Root
      css={cardSectionCss}
      variant="outline"
      colorPalette={colorDefaultTheme}
      p={{ base: '4', md: '6' }}
      {...props}
    />
  )
}
