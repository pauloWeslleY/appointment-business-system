import type {
  PASSWORD_REQUIREMENT_ID,
  PASSWORD_STRENGTH_LEVEL,
} from '../constants/password-requirements'

export type PasswordRequirementId =
  (typeof PASSWORD_REQUIREMENT_ID)[keyof typeof PASSWORD_REQUIREMENT_ID]

export interface PasswordRequirement {
  id: PasswordRequirementId
  label: string
  isMet: (password: string) => boolean
}

export type PasswordStrengthLevel =
  (typeof PASSWORD_STRENGTH_LEVEL)[keyof typeof PASSWORD_STRENGTH_LEVEL]

export interface PasswordStrengthColor {
  _light: string
  _dark: string
}

export interface PasswordStrengthLevelConfig {
  label: string
  filledSegments: number
  color: PasswordStrengthColor
}

export interface PasswordStrength extends PasswordStrengthLevelConfig {
  level: PasswordStrengthLevel
}
