import { For, Tabs } from '@chakra-ui/react'
import { useQueryState } from 'nuqs'

import { colorDefaultTheme } from '@/shared/constants/color-default-theme'

import FormUpdateEstablishment from './form-update-establishment.page'
import UploadImageEstablishment from './upload-image-establishment.page'

const MenuUpdateEstablishment = {
  EDIT: 'edit',
  UPLOAD: 'upload',
} as const

const loadMenuUpdateEstablishment = [
  { value: MenuUpdateEstablishment.EDIT, label: 'Editar' },
  { value: MenuUpdateEstablishment.UPLOAD, label: 'Upload' },
]

const loadMenuUpdateEstablishmentPages = [
  { value: MenuUpdateEstablishment.EDIT, page: FormUpdateEstablishment },
  { value: MenuUpdateEstablishment.UPLOAD, page: UploadImageEstablishment },
]

const UpdateEstablishmentPage = () => {
  const [tab, setTab] = useQueryState('tab', {
    defaultValue: MenuUpdateEstablishment.EDIT,
  })

  return (
    <Tabs.Root
      size="sm"
      value={tab}
      onValueChange={(e) => setTab(e.value)}
      colorPalette={colorDefaultTheme}
      variant="enclosed"
    >
      <Tabs.List
        aria-label="Establishment creation menu"
        bg={{ base: 'white', _dark: 'gray.950/40' }}
        rounded="xl"
      >
        <For each={loadMenuUpdateEstablishment}>
          {(item) => (
            <Tabs.Trigger key={item.value} value={item.value} rounded="lg">
              {item.label}
            </Tabs.Trigger>
          )}
        </For>
      </Tabs.List>

      <For each={loadMenuUpdateEstablishmentPages}>
        {(item) => (
          <Tabs.Content key={item.value} value={item.value}>
            <item.page />
          </Tabs.Content>
        )}
      </For>
    </Tabs.Root>
  )
}

export default UpdateEstablishmentPage
