import { Button, Card, chakra, VStack } from '@chakra-ui/react'
import { Controller } from 'react-hook-form'
import { PatternFormat } from 'react-number-format'

import InputField from '@/components/input-field'
import { Field } from '@/components/ui/field'

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
    <Card.Root
      variant="outline"
      h="fit"
      rounded="xl"
      p="4"
      shadow="xs"
      bg={{ base: 'white', _dark: 'gray.950/40' }}
      borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
    >
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

          <Field
            invalid={!!errors.businessName}
            errorText={errors.businessName?.message}
          >
            <InputField
              {...register('businessName')}
              placeholder="Digite a razão social ou nome empresarial da empresa"
            />
          </Field>
        </VStack>

        <Button
          alignSelf="flex-end"
          type="submit"
          size="sm"
          rounded="xl"
          w="fit"
          loading={isPendingUpdateOwner}
        >
          Salvar proprietário
        </Button>
      </chakra.form>
    </Card.Root>
  )
}

export default FormUpdateOwner
