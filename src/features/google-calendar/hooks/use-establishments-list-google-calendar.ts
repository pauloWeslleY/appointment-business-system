import { useRouteContext } from '@tanstack/react-router'
import { parseAsBoolean, useQueryState } from 'nuqs'

export function useEstablishmentsListGoogleCalendar() {
  const [isOpenDialogGoogleCalendar, setIsOpenDialogGoogleCalendar] =
    useQueryState('open_dialog_google', parseAsBoolean.withDefault(false))
  const { memberContext } = useRouteContext({ from: '/_app/_authenticated' })
  const listEstablishmentsGoogleCalendar = memberContext.establishments

  function handleDialogGoogleCalendar(establishmentId: string) {
    setIsOpenDialogGoogleCalendar(true)
    sessionStorage.setItem('selected_establishment_id', establishmentId)
  }

  return {
    isOpenDialogGoogleCalendar,
    listEstablishmentsGoogleCalendar,
    handleDialogGoogleCalendar,
    setIsOpenDialogGoogleCalendar,
  }
}
