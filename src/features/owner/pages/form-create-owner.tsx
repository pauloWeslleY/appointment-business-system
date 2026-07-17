import { Box, Button, chakra, HStack, Input, Text } from '@chakra-ui/react'
import { Controller } from 'react-hook-form'
import { PatternFormat } from 'react-number-format'

import { Field } from '@/components/ui/field'

import { useFormCreateOwner } from '../hooks/use-form-create-owner'

const FormCreateOwner = () => {
  const {
    control,
    register,
    handleSubmit,
    errors,
    isPendingCreateOwner,
    handleCreateOwner,
  } = useFormCreateOwner()

  return (
    <chakra.form
      w="full"
      display="flex"
      flexDir="column"
      gap={{ base: '4', md: '6' }}
      onSubmit={handleSubmit(handleCreateOwner)}
    >
      <Box>
        <Text
          as="h2"
          fontSize={{ base: '2xl', md: '3xl' }}
          color={{ base: 'colorPalette.500', _dark: 'colorPalette.300' }}
        >
          Cadastre um proprietário!
        </Text>
        <Text color={{ base: 'gray.500', _dark: 'gray.400' }}>
          Insira as informações do proprietário para criar sua conta.
        </Text>
      </Box>

      <HStack w="full" gap={{ base: '4', md: '6' }}>
        <Field invalid={!!errors.name} errorText={errors.name?.message}>
          <Input
            {...register('name')}
            placeholder="Digite seu nome"
            rounded="xl"
            size="sm"
            borderColor={{ base: 'gray.400', _dark: 'gray.600' }}
          />
        </Field>

        <Field invalid={!!errors.email} errorText={errors.email?.message}>
          <Input
            {...register('email')}
            placeholder="Digite seu e-mail"
            rounded="xl"
            size="sm"
            borderColor={{ base: 'gray.400', _dark: 'gray.600' }}
          />
        </Field>
      </HStack>

      <HStack w="full" gap={{ base: '4', md: '6' }}>
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
                customInput={Input}
                rounded="xl"
                size="sm"
                borderColor={{ base: 'gray.400', _dark: 'gray.600' }}
              />
            </Field>
          )}
        />

        <Controller
          name="cnpj"
          control={control}
          render={({ field }) => (
            <Field invalid={!!errors.cnpj} errorText={errors.cnpj?.message}>
              <PatternFormat
                value={field.value}
                onValueChange={(values) => field.onChange(values.value)}
                format="##.###.###/####-##"
                placeholder="00.000.000/0000-00"
                mask="_"
                customInput={Input}
                rounded="xl"
                size="sm"
                borderColor={{ base: 'gray.400', _dark: 'gray.600' }}
              />
            </Field>
          )}
        />
      </HStack>

      <Field
        invalid={!!errors.businessName}
        errorText={errors.businessName?.message}
      >
        <Input
          {...register('businessName')}
          placeholder="Digite a razão social ou nome empresarial da empresa"
          rounded="xl"
          size="sm"
          borderColor={{ base: 'gray.400', _dark: 'gray.600' }}
        />
      </Field>

      <Button
        type="submit"
        size="sm"
        rounded="xl"
        w="full"
        loading={isPendingCreateOwner}
      >
        Cadastrar proprietário
      </Button>
    </chakra.form>
  )
}

export default FormCreateOwner
