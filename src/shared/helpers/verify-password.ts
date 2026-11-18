import {
  PASSWORD_REQUIREMENTS,
  PASSWORD_STRENGTH_LEVEL_CONFIG,
  PASSWORD_STRENGTH_LEVELS_IN_ORDER,
} from '../constants/password-requirements'
import type {
  PasswordRequirement,
  PasswordStrength,
} from '../types/password-requirement.type'
import {
  PASSWORD_MIN_LENGTH,
  RegexNumber,
  RegexSymbol,
  RegexUppercaseLetter,
} from '../utils/regex-password-requirement'

export const hasPasswordMinimumLength = (value: string) =>
  value.length >= PASSWORD_MIN_LENGTH

export const hasPasswordUppercaseLetter = (value: string) =>
  RegexUppercaseLetter.test(value)

export const hasPasswordNumber = (value: string) => RegexNumber.test(value)

export const hasPasswordSymbol = (value: string) => RegexSymbol.test(value)

const LOWEST_STRENGTH_POSITION = 1

export const hasMetAllPasswordRequirements = (password: string): boolean =>
  PASSWORD_REQUIREMENTS.every((requirement) => requirement.isMet(password))

export const getMetPasswordRequirements = (
  password: string,
): readonly PasswordRequirement[] =>
  PASSWORD_REQUIREMENTS.filter((requirement) => requirement.isMet(password))

const getStrengthPosition = (metRequirementsCount: number): number => {
  const highestStrengthPosition = PASSWORD_STRENGTH_LEVELS_IN_ORDER.length
  const strengthPosition = Math.max(
    metRequirementsCount,
    LOWEST_STRENGTH_POSITION,
  )

  return Math.min(strengthPosition, highestStrengthPosition)
}

export const getPasswordStrength = (
  password: string,
): PasswordStrength | null => {
  const hasPassword = password.length > 0

  if (!hasPassword) {
    return null
  }

  const metRequirements = getMetPasswordRequirements(password)
  const strengthPosition = getStrengthPosition(metRequirements.length)
  const level = PASSWORD_STRENGTH_LEVELS_IN_ORDER[strengthPosition - 1]

  return {
    level,
    ...PASSWORD_STRENGTH_LEVEL_CONFIG[level],
  }
}
