import type { ColorPalette } from '@chakra-ui/react'
import z from 'zod'

export const StatusInvitations = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
  CANCELED: 'canceled',
} as const

export const StatusInvitationsArray = Object.values(StatusInvitations)
export const StatusInvitationsSchema = z.enum(StatusInvitationsArray)

export type StatusInvitationsType =
  (typeof StatusInvitations)[keyof typeof StatusInvitations]

interface InvitationStatusLabel {
  label: string
  color: ColorPalette
}

export const mapLabelInvitationStatus = (
  status: StatusInvitationsType = StatusInvitations.PENDING,
): InvitationStatusLabel => {
  const map: Record<StatusInvitationsType, InvitationStatusLabel> = {
    [StatusInvitations.PENDING]: { label: 'Pendente', color: 'yellow' },
    [StatusInvitations.ACCEPTED]: { label: 'Aceito', color: 'green' },
    [StatusInvitations.REJECTED]: { label: 'Rejeitado', color: 'orange' },
    [StatusInvitations.CANCELED]: { label: 'Cancelado', color: 'red' },
  }

  return map[status]
}
