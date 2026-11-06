import {
  Box,
  Button,
  Fieldset,
  HStack,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import type { UseFormReturn } from 'react-hook-form'

import InputField from '@/components/input-field'
import { useColorMode } from '@/components/ui/color-mode'
import { Field } from '@/components/ui/field'
import { cardSectionCss } from '@/theme/styles/global-styles'

import { EstablishmentHexColorSchema } from '../schemas/establishment-settings.schema'
import type { EstablishmentColorsForm } from '../types/establishment-colors-form.type'
import {
  defaultEstablishmentColors,
  establishmentThemeStyle,
} from '../utils/establishment-theme'

interface EstablishmentColorFieldsProps {
  form: UseFormReturn<EstablishmentColorsForm>
  values: Partial<EstablishmentColorsForm>
}

const EstablishmentColorFields = ({
  form,
  values,
}: EstablishmentColorFieldsProps) => {
  const { colorMode } = useColorMode()
  const colors = [
    { name: 'primaryColor', label: 'Cor primária' },
    { name: 'secondaryColor', label: 'Cor secundária' },
    { name: 'tertiaryColor', label: 'Cor terciária' },
  ] as const

  function restoreDefaultColors() {
    for (const color of colors) {
      form.setValue(color.name, '', {
        shouldDirty: true,
        shouldValidate: true,
      })
    }
  }

  function getColorValue(colorName: keyof EstablishmentColorsForm) {
    const value = values[colorName]
    return EstablishmentHexColorSchema.safeParse(value).success
      ? value
      : defaultEstablishmentColors[colorName]
  }

  function onChangeColor(
    colorName: keyof EstablishmentColorsForm,
    value: string,
  ) {
    form.setValue(colorName, value, {
      shouldDirty: true,
      shouldValidate: true,
    })
  }

  return (
    <Fieldset.Root css={cardSectionCss} borderWidth="1px">
      <Fieldset.Legend fontSize="lg">Cores do estabelecimento</Fieldset.Legend>
      <Fieldset.HelperText>
        Personalize a paleta desta unidade. Campos vazios usam as cores padrão.
      </Fieldset.HelperText>

      <Fieldset.Content>
        <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap="4">
          {colors.map((color) => (
            <Field
              key={color.name}
              label={color.label}
              invalid={Boolean(form.formState.errors[color.name])}
              errorText={form.formState.errors[color.name]?.message}
            >
              <HStack w="full">
                <InputField
                  type="color"
                  aria-label={'Selecionar ' + color.label.toLowerCase()}
                  w="14"
                  flexShrink="0"
                  p="1"
                  value={getColorValue(color.name)}
                  onChange={(event) =>
                    onChangeColor(color.name, event.target.value)
                  }
                />
                <InputField
                  {...form.register(color.name)}
                  minW="0"
                  placeholder={defaultEstablishmentColors[color.name]}
                  maxLength={7}
                  autoComplete="off"
                  aria-label={color.label + ' em hexadecimal'}
                />
              </HStack>
            </Field>
          ))}
        </SimpleGrid>

        <Button
          rounded="lg"
          type="button"
          variant="outline"
          size="sm"
          alignSelf="start"
          onClick={restoreDefaultColors}
        >
          Restaurar cores padrão
        </Button>

        <Box
          style={establishmentThemeStyle(values, colorMode)}
          borderWidth="1px"
          borderColor="primary.border"
          borderRadius="xl"
          p="5"
          bg={{ _light: 'tertiary.100', _dark: 'secondary.900' }}
        >
          <Stack gap="3">
            <Text
              fontWeight="semibold"
              color={{ _light: 'primary.800', _dark: 'primary.200' }}
            >
              Prévia da identidade visual
            </Text>
            <Text color={{ _light: 'secondary.800', _dark: 'secondary.100' }}>
              Assim ficam os destaques e as superfícies do painel desta unidade.
            </Text>

            <Button
              type="button"
              colorPalette="brand"
              size="sm"
              rounded="lg"
              alignSelf="start"
              tabIndex={-1}
              aria-disabled="true"
              pointerEvents="none"
            >
              Agendar atendimento
            </Button>
          </Stack>
        </Box>
      </Fieldset.Content>
    </Fieldset.Root>
  )
}

export default EstablishmentColorFields
