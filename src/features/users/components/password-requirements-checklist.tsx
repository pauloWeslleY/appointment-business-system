import {
  chakra,
  defineStyle,
  For,
  HStack,
  Icon,
  SimpleGrid,
  Text,
  VisuallyHidden,
} from '@chakra-ui/react'
import { Check, Circle } from 'lucide-react'

import { PASSWORD_REQUIREMENTS } from '@/shared/constants/password-requirements'

const metRequirementColor = { _light: 'green.700', _dark: 'green.400' }
const pendingRequirementColor = { _light: 'slate.500', _dark: 'slate.400' }

const requirementItemCss = defineStyle({
  gap: '2',
  fontSize: 'sm',
  transition: 'color 0.2s ease',
})

interface PasswordRequirementsChecklistProps {
  password: string
}

const PasswordRequirementsChecklist = ({
  password,
}: PasswordRequirementsChecklistProps) => {
  return (
    <SimpleGrid
      as="ul"
      aria-label="Requisitos da nova senha"
      aria-live="polite"
      columns={{ base: 1, md: 2 }}
      gapX="6"
      gapY="1.5"
      listStyleType="none"
      p="4"
      rounded="xl"
      borderWidth="1px"
      borderColor={{ _light: 'gray.200', _dark: 'slate.900' }}
      bg={{ _light: 'slate.100', _dark: 'slate.950/60' }}
    >
      <For each={PASSWORD_REQUIREMENTS}>
        {(requirement) => {
          const isRequirementMet = requirement.isMet(password)
          const requirementColor = isRequirementMet
            ? metRequirementColor
            : pendingRequirementColor
          const requirementIcon = isRequirementMet ? Check : Circle
          const requirementStatus = isRequirementMet ? 'cumprido' : 'pendente'

          return (
            <chakra.li key={requirement.id}>
              <HStack color={requirementColor} css={requirementItemCss}>
                <Icon as={requirementIcon} boxSize="4" aria-hidden="true" />
                <Text>{requirement.label}</Text>
                <VisuallyHidden>{requirementStatus}</VisuallyHidden>
              </HStack>
            </chakra.li>
          )
        }}
      </For>
    </SimpleGrid>
  )
}

export default PasswordRequirementsChecklist
