export const StatusOpeningHours = {
  OPEN: 'open',
  CLOSED: 'closed',
} as const

export type StatusOpeningHours =
  (typeof StatusOpeningHours)[keyof typeof StatusOpeningHours]
