import { For, Icon, Tabs } from '@chakra-ui/react'
import { PencilIcon, UploadCloud } from 'lucide-react'
import { useQueryState } from 'nuqs'

import { colorDefaultTheme } from '@/shared/constants/color-default-theme'

import FormUpdateEstablishment from './form-update-establishment.page'
import UploadImageEstablishment from './upload-image-establishment.page'

const MenuUpdateEstablishment = {
  EDIT: 'edit',
  UPLOAD: 'upload',
} as const

const loadMenuUpdateEstablishment = [
  {
    label: 'Editar',
    value: MenuUpdateEstablishment.EDIT,
    icon: PencilIcon,
    page: FormUpdateEstablishment,
  },
  {
    label: 'Upload',
    value: MenuUpdateEstablishment.UPLOAD,
    icon: UploadCloud,
    page: UploadImageEstablishment,
  },
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
      variant="line"
    >
      <Tabs.List
        aria-label="Establishment updated menu"
        w={{ base: 'full', lg: 'md' }}
      >
        <For each={loadMenuUpdateEstablishment}>
          {(item) => (
            <Tabs.Trigger
              key={item.value}
              value={item.value}
              flex="1"
              justifyContent="center"
            >
              <Icon as={item.icon} boxSize="4" />
              {item.label}
            </Tabs.Trigger>
          )}
        </For>
      </Tabs.List>

      <For each={loadMenuUpdateEstablishment}>
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
