import { Box, Button, Card, EmptyState, Icon } from '@chakra-ui/react'
import { UserRoundPlus } from 'lucide-react'
import type { ReactNode } from 'react'

import { cardSectionCss } from '@/theme/styles/global-styles'

interface AlertTeamManagementProps {
  icon: React.ElementType
  title: string
  description: string
  children?: ReactNode
}

const EmptyStateTeamManagement = ({
  title,
  icon,
  description,
  children,
}: AlertTeamManagementProps) => {
  return (
    <Card.Root
      css={cardSectionCss}
      variant="outline"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDir="column"
      gap="3"
    >
      <EmptyState.Root>
        <EmptyState.Content>
          <EmptyState.Indicator
            p="4"
            rounded="full"
            bg={{ _light: 'sea.200/60', _dark: 'sea.900/20' }}
          >
            <Icon
              as={icon}
              boxSize="6"
              color={{ _light: 'sea.500', _dark: 'sea.300' }}
            />
          </EmptyState.Indicator>

          <Box spaceY="2" textAlign="center">
            <EmptyState.Title fontSize="lg" fontWeight="bold">
              {title}
            </EmptyState.Title>
            <EmptyState.Description
              fontSize="sm"
              letterSpacing="wider"
              color={{ _light: 'slate.400', _dark: 'slate.600' }}
            >
              {description}
            </EmptyState.Description>
          </Box>

          {children ? (
            children
          ) : (
            <Button rounded="2xl" size="xs">
              <Icon as={UserRoundPlus} boxSize="5" />
              Convidar Membro
            </Button>
          )}
        </EmptyState.Content>
      </EmptyState.Root>
    </Card.Root>
  )
}

export default EmptyStateTeamManagement
