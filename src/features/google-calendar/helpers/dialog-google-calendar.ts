export const DialogGoogleCalendar = {
  CONNECT: 'connect_google',
  DISCONNECT: 'disconnect_google',
} as const

export type DialogGoogleCalendarType =
  (typeof DialogGoogleCalendar)[keyof typeof DialogGoogleCalendar]

export const mapDialogGoogleCalendar: Record<DialogGoogleCalendarType, string> =
  {
    [DialogGoogleCalendar.CONNECT]: `open_dialog_${DialogGoogleCalendar.CONNECT}`,
    [DialogGoogleCalendar.DISCONNECT]: `open_dialog_${DialogGoogleCalendar.DISCONNECT}`,
  } as const
