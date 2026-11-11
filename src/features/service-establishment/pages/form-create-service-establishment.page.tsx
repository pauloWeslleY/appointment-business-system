import {
  Alert,
  Button,
  chakra,
  GridItem,
  HStack,
  Separator,
  SimpleGrid,
  Spinner,
  Text,
} from '@chakra-ui/react'

import FieldsServiceEstablishment from '../components/fields-service-establishment'
import UploadImageServiceEstablishment from '../components/upload-image-service-establishment'
import { useFormCreateServiceEstablishment } from '../hooks/use-form-create-service-establishment'

const FormCreateServiceEstablishment = () => {
  const {
    control,
    errors,
    isCreatingServiceEstablishment,
    register,
    handleSubmit,
    onSubmitCreateServiceEstablishment,
  } = useFormCreateServiceEstablishment()

  return (
    <chakra.form
      w="full"
      onSubmit={handleSubmit(onSubmitCreateServiceEstablishment)}
    >
      <SimpleGrid columns={{ base: 1, md: 2 }} gap="4" w="full">
        <FieldsServiceEstablishment
          control={control}
          register={register}
          errors={errors}
        />

        <GridItem colSpan={{ base: 1, md: 2 }} asChild>
          <HStack>
            <Separator
              flex="1"
              borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
            />
            <Text flexShrink="0">Imagem do serviço</Text>
            <Separator
              flex="1"
              borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
            />
          </HStack>
        </GridItem>

        <GridItem colSpan={{ base: 1, md: 2 }}>
          <UploadImageServiceEstablishment control={control} errors={errors} />
        </GridItem>

        <GridItem
          colSpan={{ base: 1, md: 2 }}
          placeSelf={{ base: 'center', md: 'end' }}
        >
          <Button
            type="submit"
            w="fit"
            size="sm"
            rounded="lg"
            colorPalette="brand"
            loading={isCreatingServiceEstablishment}
            loadingText="Cadastrando..."
          >
            Cadastrar serviço
          </Button>
        </GridItem>
      </SimpleGrid>

      {isCreatingServiceEstablishment && (
        <Alert.Root
          borderStartWidth="3px"
          borderStartColor="colorPalette.600"
          mt="2"
          role="status"
        >
          <Alert.Indicator>
            <Spinner size="sm" />
          </Alert.Indicator>
          <Alert.Title>Cadastrando serviço...</Alert.Title>
        </Alert.Root>
      )}
    </chakra.form>
  )
}

export default FormCreateServiceEstablishment
