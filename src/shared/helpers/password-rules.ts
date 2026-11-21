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
