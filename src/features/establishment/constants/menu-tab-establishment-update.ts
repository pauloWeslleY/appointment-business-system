export const MenuUpdateEstablishment = {
  EDIT: 'edit',
  UPLOAD: 'upload',
  ADDRESS: 'address',
} as const

export const MENU_UPDATE_ESTABLISHMENT = Object.values(MenuUpdateEstablishment)

export type MenuUpdateEstablishmentType =
  (typeof MENU_UPDATE_ESTABLISHMENT)[number]
