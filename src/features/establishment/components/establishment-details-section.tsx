import { Card } from '@chakra-ui/react'
import type { ReactNode } from 'react'

import { cardCss, tableColumnsCss } from '@/theme/styles/global-styles'

interface EstablishmentDetailsSectionProps {
  title: string
  children: ReactNode
}

const EstablishmentDetailsSection = ({
  title,
  children,
}: EstablishmentDetailsSectionProps) => (
  <Card.Root variant="outline" css={cardCss} p="0" h="full">
    <Card.Header
      py="3"
      px="4"
      borderBottomWidth="1px"
      borderColor={{ _light: 'gray.200', _dark: 'secondary.500/20' }}
    >
      <Card.Title fontSize="md" fontWeight="medium" {...tableColumnsCss}>
        {title}
      </Card.Title>
    </Card.Header>
    <Card.Body p="4" gap="4">
      {children}
    </Card.Body>
  </Card.Root>
)

export default EstablishmentDetailsSection
