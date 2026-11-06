import { Fieldset } from '@chakra-ui/react'
import { Controller, useFormContext } from 'react-hook-form'
import { PatternFormat } from 'react-number-format'

import InputField from '@/components/input-field'
import { Field } from '@/components/ui/field'
import { FormatMask } from '@/shared/utils/formatted-mask'
import { cardSectionCss } from '@/theme/styles/global-styles'

import type { EstablishmentLinksForm } from '../types/establishment-links-form.type'

const EstablishmentSocialLinksFields = () => {
  const form = useFormContext<EstablishmentLinksForm>()
  const errors = form.formState.errors

  return (
    <Fieldset.Root css={cardSectionCss} borderWidth="1px">
      <Fieldset.Legend fontSize="lg">Redes sociais</Fieldset.Legend>
      <Fieldset.HelperText>
        Opcional. Deixe um campo em branco para remover o contato cadastrado.
      </Fieldset.HelperText>

      <Fieldset.Content gap="5">
        <Field
          label="Instagram"
          invalid={Boolean(errors.instagram)}
          errorText={errors.instagram?.message}
        >
          <InputField
            {...form.register('instagram')}
            type="url"
            placeholder="https://instagram.com/seu-estabelecimento"
            autoComplete="url"
            maxLength={2048}
          />
        </Field>

        <Field
          label="Facebook"
          invalid={Boolean(errors.facebook)}
          errorText={errors.facebook?.message}
        >
          <InputField
            {...form.register('facebook')}
            type="url"
            placeholder="https://facebook.com/seu-estabelecimento"
            autoComplete="url"
            maxLength={2048}
          />
        </Field>

        <Controller
          control={form.control}
          name="whatsapp"
          render={({ field, fieldState }) => (
            <Field
              label="WhatsApp"
              invalid={Boolean(fieldState.error)}
              errorText={fieldState.error?.message}
            >
              <PatternFormat
                name={field.name}
                onBlur={field.onBlur}
                getInputRef={field.ref}
                value={field.value}
                onValueChange={(values, sourceInfo) => {
                  // Reformatações vindas do reset do formulário não são edições do usuário.
                  const isUserEdit = sourceInfo.source === 'event'

                  if (isUserEdit) {
                    field.onChange(values.value)
                  }
                }}
                format={FormatMask.CELLPHONE}
                placeholder="(00) 00000-0000"
                mask="_"
                inputMode="tel"
                autoComplete="tel"
                customInput={InputField}
              />
            </Field>
          )}
        />
      </Fieldset.Content>
    </Fieldset.Root>
  )
}

export default EstablishmentSocialLinksFields
