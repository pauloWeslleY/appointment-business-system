import { Button, Card, chakra, VStack } from '@chakra-ui/react'
import { Controller } from 'react-hook-form'
import { PatternFormat } from 'react-number-format'

import InputField from '@/components/input-field'
import { Field } from '@/components/ui/field'
import { cardSectionCss } from '@/theme/styles/global-styles'

import { useFormUpdateOwner } from '../hooks/use-form-update-owner'

const FormUpdateOwner = () => {
  const {
    errors,
    control,
    register,
    handleSubmit,
    isPendingUpdateOwner,
    handleUpdateOwner,
  } = useFormUpdateOwner()

  return (
    <Card.Root variant="outline" h="fit" css={cardSectionCss}>
      <Card.Header p="0" mb="4">
        <Card.Title
          color={{ base: 'colorPalette.solid', _dark: 'colorPalette.fg' }}
        >
          Dados do proprietário.
        </Card.Title>
        <Card.Description>
          Atualize as informações do proprietário, como nome, telefone e razão
          social. Certifique-se de fornecer informações precisas e atualizadas
          para manter os registros corretos.
        </Card.Description>
      </Card.Header>

      <chakra.form
        display="flex"
        flexDirection="column"
        gap="2"
        w="full"
        onSubmit={handleSubmit(handleUpdateOwner)}
      >
        <VStack gap="2" w="full">
          <Field invalid={!!errors.name} errorText={errors.name?.message}>
            <InputField {...register('name')} placeholder="Digite seu nome" />
          </Field>

          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <Field invalid={!!errors.phone} errorText={errors.phone?.message}>
                <PatternFormat
                  value={field.value}
                  onValueChange={(values) => field.onChange(values.value)}
                  format="(##) #####-####"
                  placeholder="(00) 00000-0000"
                  mask="_"
                  customInput={InputField}
                />
              </Field>
            )}
          />
        </VStack>

        <Button
          alignSelf="flex-end"
          type="submit"
          size="sm"
          rounded="xl"
          w="fit"
          variant="subtle"
          colorPalette="primary"
          loading={isPendingUpdateOwner}
        >
          Salvar proprietário
        </Button>
      </chakra.form>
    </Card.Root>
  )
}

export default FormUpdateOwner
