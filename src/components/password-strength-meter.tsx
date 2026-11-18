import { Box, defineStyle, For, HStack, Text } from '@chakra-ui/react'

import { PASSWORD_STRENGTH_SEGMENTS } from '@/shared/constants/password-requirements'
import type { PasswordStrength } from '@/shared/types/password-requirement.type'

const EMPTY_STRENGTH_FILLED_SEGMENTS = 0

const STRENGTH_SEGMENT_POSITIONS = Array.from(
  { length: PASSWORD_STRENGTH_SEGMENTS },
  (_, index) => index + 1,
)

const emptySegmentColor = { _light: 'slate.200', _dark: 'slate.800' }

const strengthSegmentCss = defineStyle({
  flex: '1',
  h: '1.5',
  rounded: 'full',
  transition: 'background-color 0.25s ease',
})

const strengthLabelCss = defineStyle({
  flexShrink: '0',
  fontSize: 'sm',
  fontWeight: 'semibold',
  transition: 'color 0.25s ease',
})

interface PasswordStrengthMeterProps {
  strength: PasswordStrength | null
}

const PasswordStrengthMeter = ({ strength }: PasswordStrengthMeterProps) => {
  const filledSegments =
    strength?.filledSegments ?? EMPTY_STRENGTH_FILLED_SEGMENTS
  const strengthDescription = strength
    ? `Força da senha: ${strength.label}`
    : 'Força da senha: nenhuma senha digitada'

  return (
    <HStack gap="4" w="full">
      <HStack
        role="meter"
        aria-label="Força da nova senha"
        aria-valuemin={EMPTY_STRENGTH_FILLED_SEGMENTS}
        aria-valuemax={PASSWORD_STRENGTH_SEGMENTS}
        aria-valuenow={filledSegments}
        aria-valuetext={strengthDescription}
        flex="1"
        gap="2"
      >
        <For each={STRENGTH_SEGMENT_POSITIONS}>
          {(segmentPosition) => {
            const isSegmentFilled = segmentPosition <= filledSegments
            const segmentColor =
              isSegmentFilled && strength ? strength.color : emptySegmentColor

            return (
              <Box
                key={segmentPosition}
                bg={segmentColor}
                css={strengthSegmentCss}
              />
            )
          }}
        </For>
      </HStack>

      {strength && (
        <Text aria-hidden="true" color={strength.color} css={strengthLabelCss}>
          Força: {strength.label}
        </Text>
      )}
    </HStack>
  )
}

export default PasswordStrengthMeter
