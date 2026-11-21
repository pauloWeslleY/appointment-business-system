import {
  Box,
  Button,
  Fieldset,
  For,
  HStack,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import type { UseFormReturn } from 'react-hook-form'

import InputField from '@/components/input-field'
import { Field } from '@/components/ui/field'
import { cardSectionCss } from '@/theme/styles/global-styles'

import { useEstablishmentColorFields } from '../hooks/use-establishment-color-fields'
import type { EstablishmentColorsForm } from '../types/establishment-colors-form.type'

interface EstablishmentColorFieldsProps {
  formEstablishmentColors: UseFormReturn<EstablishmentColorsForm>
  establishmentColorsValues: Partial<EstablishmentColorsForm>
}

const EstablishmentColorFields = ({
  formEstablishmentColors,
  establishmentColorsValues,
}: EstablishmentColorFieldsProps) => {
  const {
    establishmentColorFields,
    establishmentColorsPreviewStyle,
    changeEstablishmentColor,
    restoreDefaultEstablishmentColors,
  } = useEstablishmentColorFields({
    formEstablishmentColors,
    establishmentColorsValues,
  })

  return (
    <Fieldset.Root css={cardSectionCss} borderWidth="1px">
      <Fieldset.Legend fontSize="lg">Cores do estabelecimento</Fieldset.Legend>
      <Fieldset.HelperText mt="0">
        Personalize a paleta desta unidade. Campos vazios usam as cores padrão.
      </Fieldset.HelperText>

      <Fieldset.Content>
        <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap="4">
          <For each={establishmentColorFields}>
            {(establishmentColorField) => (
              <Field
                key={establishmentColorField.name}
                label={establishmentColorField.label}
                invalid={establishmentColorField.isInvalidColor}
                errorText={establishmentColorField.colorErrorMessage}
              >
                <HStack w="full">
                  <InputField
                    type="color"
                    aria-label={establishmentColorField.colorPickerAriaLabel}
                    flexShrink="0"
                    w="14"
                    p="1"
                    value={establishmentColorField.colorPickerValue}
                    onChange={(colorPickerChangeEvent) =>
                      changeEstablishmentColor(
                        establishmentColorField.name,
                        colorPickerChangeEvent.target.value,
                      )
                    }
                  />
                  <InputField
                    {...formEstablishmentColors.register(
                      establishmentColorField.name,
                    )}
                    minW="0"
                    placeholder={establishmentColorField.defaultColorValue}
                    maxLength={7}
                    autoComplete="off"
                    aria-label={establishmentColorField.hexColorInputAriaLabel}
                  />
                </HStack>
              </Field>
            )}
          </For>
        </SimpleGrid>

        <Button
          rounded="lg"
          type="button"
          variant="outline"
          size="sm"
          alignSelf="start"
          onClick={restoreDefaultEstablishmentColors}
        >
          Restaurar cores padrão
        </Button>

        <Box
          style={establishmentColorsPreviewStyle}
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
              Prévia das cores cadastradas para o site deste estabelecimento.
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
