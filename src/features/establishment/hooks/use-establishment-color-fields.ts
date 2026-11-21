import type { UseFormReturn } from 'react-hook-form'

import { useColorMode } from '@/components/ui/color-mode'

import { EstablishmentHexColorSchema } from '../schemas/establishment-settings.schema'
import type { EstablishmentColorsForm } from '../types/establishment-colors-form.type'
import {
  defaultEstablishmentColors,
  establishmentThemeStyle,
} from '../utils/establishment-theme'

interface UseEstablishmentColorFieldsParams {
  formEstablishmentColors: UseFormReturn<EstablishmentColorsForm>
  establishmentColorsValues: Partial<EstablishmentColorsForm>
}

export function useEstablishmentColorFields({
  formEstablishmentColors,
  establishmentColorsValues,
}: UseEstablishmentColorFieldsParams) {
  const { colorMode } = useColorMode()
  const establishmentColorFieldErrors = formEstablishmentColors.formState.errors

  const establishmentColorFieldDefinitions = [
    { name: 'primaryColor', label: 'Cor primária' },
    { name: 'secondaryColor', label: 'Cor secundária' },
    { name: 'tertiaryColor', label: 'Cor terciária' },
  ] as const

  const establishmentColorFields = establishmentColorFieldDefinitions.map(
    (colorFieldDefinition) => {
      const colorFieldError =
        establishmentColorFieldErrors[colorFieldDefinition.name]
      const typedColorValue =
        establishmentColorsValues[colorFieldDefinition.name]
      const defaultColorValue =
        defaultEstablishmentColors[colorFieldDefinition.name]
      const isValidTypedColor =
        EstablishmentHexColorSchema.safeParse(typedColorValue).success

      return {
        name: colorFieldDefinition.name,
        label: colorFieldDefinition.label,
        colorPickerAriaLabel:
          'Selecionar ' + colorFieldDefinition.label.toLowerCase(),
        hexColorInputAriaLabel: colorFieldDefinition.label + ' em hexadecimal',
        colorPickerValue: isValidTypedColor
          ? typedColorValue
          : defaultColorValue,
        defaultColorValue,
        isInvalidColor: Boolean(colorFieldError),
        colorErrorMessage: colorFieldError?.message,
      }
    },
  )

  const establishmentColorsPreviewStyle = establishmentThemeStyle(
    establishmentColorsValues,
    colorMode,
  )

  function changeEstablishmentColor(
    colorFieldName: keyof EstablishmentColorsForm,
    selectedColor: string,
  ) {
    formEstablishmentColors.setValue(colorFieldName, selectedColor, {
      shouldDirty: true,
      shouldValidate: true,
    })
  }

  function restoreDefaultEstablishmentColors() {
    for (const colorFieldDefinition of establishmentColorFieldDefinitions) {
      formEstablishmentColors.setValue(colorFieldDefinition.name, '', {
        shouldDirty: true,
        shouldValidate: true,
      })
    }
  }

  return {
    establishmentColorFields,
    establishmentColorsPreviewStyle,
    changeEstablishmentColor,
    restoreDefaultEstablishmentColors,
  }
}
