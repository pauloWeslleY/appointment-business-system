export const MenuUpdateEstablishment = {
  EDIT: 'edit',
  UPLOAD: 'upload',
  ADDRESS: 'address',
} as const

export const MENU_UPDATE_ESTABLISHMENT = Object.values(MenuUpdateEstablishment)

export type MenuUpdateEstablishmentType =
  (typeof MENU_UPDATE_ESTABLISHMENT)[number]

export const MenuSettingsEstablishment = Object.assign(
  { ...MenuUpdateEstablishment },
  {
    LINKS: 'links',
    COLORS: 'colors',
    SUMMARY: 'summary',
  } as const,
)

export const MENU_SETTINGS_ESTABLISHMENT = Object.values(
  MenuSettingsEstablishment,
)

export type MenuSettingsEstablishmentType =
  (typeof MENU_SETTINGS_ESTABLISHMENT)[number]
