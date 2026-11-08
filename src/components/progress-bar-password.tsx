import {
  type ColorPalette,
  HStack,
  Progress,
  type ProgressRootProps,
} from '@chakra-ui/react'

import { passwordCriteria } from '@/features/authentication/constants/password-criteria'

interface ProgressBarPasswordProps extends ProgressRootProps {
  password: string
}

const strengthLevels: { label: string; color: ColorPalette }[] = [
  { label: 'Fraca', color: 'red' },
  { label: 'Fraca', color: 'red' },
  { label: 'Razoável', color: 'orange' },
  { label: 'Forte', color: 'green' },
  { label: 'Muito forte', color: 'green' },
]

const ProgressBarPassword = ({
  password,
  ...props
}: ProgressBarPasswordProps) => {
  const checks = passwordCriteria.map((criterion) => ({
    label: criterion.label,
    valid: criterion.validate(password),
  }))

  const passedChecks = checks.filter((check) => check.valid).length
  const score = password.length < 8 ? Math.min(passedChecks, 1) : passedChecks
  const strength = strengthLevels[score]
  const scorePercentage = Math.round((score / 4) * 100)

  return (
    <Progress.Root
      min={0}
      max={4}
      value={score}
      colorPalette={strength.color}
      variant="subtle"
      {...props}
    >
      <HStack gap="4">
        <Progress.Label flexShrink="0">{strength.label}</Progress.Label>

        <Progress.Track flex="1" minW="0">
          <Progress.Range />
        </Progress.Track>

        <Progress.ValueText flexShrink="0">
          {scorePercentage}%
        </Progress.ValueText>
      </HStack>
    </Progress.Root>
  )
}

export default ProgressBarPassword
