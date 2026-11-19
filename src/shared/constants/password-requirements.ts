import {
  hasPasswordMinimumLength,
  hasPasswordNumber,
  hasPasswordSymbol,
  hasPasswordUppercaseLetter,
} from '../helpers/password-rules'
import type {
  PasswordRequirement,
  PasswordStrengthLevel,
  PasswordStrengthLevelConfig,
} from '../types/password-requirement.type'
import { PASSWORD_MIN_LENGTH } from '../utils/regex-password-requirement'

export const PASSWORD_REQUIREMENT_ID = {
  MINIMUM_LENGTH: 'minimum-length',
  UPPERCASE_LETTER: 'uppercase-letter',
  NUMBER: 'number',
  SYMBOL: 'symbol',
} as const

export const PASSWORD_REQUIREMENTS: readonly PasswordRequirement[] = [
  {
    id: PASSWORD_REQUIREMENT_ID.MINIMUM_LENGTH,
    label: `Pelo menos ${PASSWORD_MIN_LENGTH} caracteres`,
    isMet: hasPasswordMinimumLength,
  },
  {
    id: PASSWORD_REQUIREMENT_ID.UPPERCASE_LETTER,
    label: 'Uma letra maiúscula',
    isMet: hasPasswordUppercaseLetter,
  },
  {
    id: PASSWORD_REQUIREMENT_ID.NUMBER,
    label: 'Um número',
    isMet: hasPasswordNumber,
  },
  {
    id: PASSWORD_REQUIREMENT_ID.SYMBOL,
    label: 'Um símbolo (!@#$...)',
    isMet: hasPasswordSymbol,
  },
]

export const PASSWORD_STRENGTH_SEGMENTS = 4

export const PASSWORD_STRENGTH_LEVEL = {
  WEAK: 'weak',
  MEDIUM: 'medium',
  GOOD: 'good',
  STRONG: 'strong',
} as const

export const PASSWORD_STRENGTH_LEVELS_IN_ORDER: readonly PasswordStrengthLevel[] =
  [
    PASSWORD_STRENGTH_LEVEL.WEAK,
    PASSWORD_STRENGTH_LEVEL.MEDIUM,
    PASSWORD_STRENGTH_LEVEL.GOOD,
    PASSWORD_STRENGTH_LEVEL.STRONG,
  ]

export const PASSWORD_STRENGTH_LEVEL_CONFIG: Readonly<
  Record<PasswordStrengthLevel, PasswordStrengthLevelConfig>
> = {
  [PASSWORD_STRENGTH_LEVEL.WEAK]: {
    label: 'Fraca',
    filledSegments: 1,
    color: { _light: 'red.500', _dark: 'red.400' },
  },
  [PASSWORD_STRENGTH_LEVEL.MEDIUM]: {
    label: 'Média',
    filledSegments: 2,
    color: { _light: 'yellow.600', _dark: 'yellow.400' },
  },
  [PASSWORD_STRENGTH_LEVEL.GOOD]: {
    label: 'Boa',
    filledSegments: 3,
    color: { _light: 'sea.600', _dark: 'sea.400' },
  },
  [PASSWORD_STRENGTH_LEVEL.STRONG]: {
    label: 'Forte',
    filledSegments: 4,
    color: { _light: 'green.600', _dark: 'green.400' },
  },
}
