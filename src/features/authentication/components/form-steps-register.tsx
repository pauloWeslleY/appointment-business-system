import { Button, HStack, Icon, Steps, VStack } from '@chakra-ui/react'
import { useNavigate } from '@tanstack/react-router'
import { ArrowRight, CircleCheckBig } from 'lucide-react'

import { useFormCreateOrganizationProfile } from '@/features/organization-profile/hooks/use-form-create-organization-profile'

import FormCreateOrganizationProfile from '../../owner/pages/form-create-organization-profile'
import { useStepRegister } from '../hooks/use-step-register'
import FormRegister from '../pages/form-register.page'

const steps = ['Usuário', 'Perfil Empresarial'] as const

const FormStepsRegister = () => {
  const { stepRegister, setStepRegisterWithValidation } = useStepRegister()
  const formCreateOrganizationProfile = useFormCreateOrganizationProfile(
    setStepRegisterWithValidation,
  )
  const navigate = useNavigate()

  const handleGoLogin = () => navigate({ to: '/login' })

  return (
    <Steps.Root
      step={stepRegister}
      onStepChange={(e) => setStepRegisterWithValidation(e.step)}
      count={steps.length}
      variant="subtle"
    >
      <Steps.List>
        {steps.map((step, index) => (
          <Steps.Item key={index} index={index} title={step}>
            <Steps.Indicator
              bg={
                index === stepRegister
                  ? { base: 'navy.300', _dark: 'navy.600' }
                  : { base: 'slate.400', _dark: 'slate.600' }
              }
            />
            <Steps.Title>{step}</Steps.Title>
            <Steps.Separator bg={{ base: 'slate.400', _dark: 'slate.600' }} />
          </Steps.Item>
        ))}
      </Steps.List>

      <Steps.Content index={0}>
        <FormRegister />
      </Steps.Content>

      <Steps.Content index={1}>
        <FormCreateOrganizationProfile {...formCreateOrganizationProfile} />
      </Steps.Content>

      <Steps.CompletedContent
        display="flex"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        gap="4"
        mt="6"
        p="4"
        rounded="xl"
        bg={{ base: 'green.300/20', _dark: 'green.500/10' }}
        borderWidth="1px"
        borderColor={{ base: 'green.300', _dark: 'green.700' }}
      >
        <VStack color={{ base: 'green.600', _dark: 'green.400' }}>
          <Icon as={CircleCheckBig} boxSize="8" />
          Todos os passos foram concluídos!
        </VStack>

        <Button
          variant="surface"
          rounded="xl"
          colorPalette="primary"
          size="sm"
          loading={
            formCreateOrganizationProfile.isPendingCreateOrganizationProfile
          }
          onClick={handleGoLogin}
        >
          Entrar
          <Icon as={ArrowRight} ml="2" />
        </Button>
      </Steps.CompletedContent>

      <HStack align="center" gap="2">
        {stepRegister === steps.length - 1 && (
          <Button
            flex="1"
            size="sm"
            rounded="xl"
            variant="outline"
            colorPalette="brand"
            onClick={formCreateOrganizationProfile.handleGoBackToPreviousStep}
          >
            Voltar
          </Button>
        )}
        {stepRegister === steps.length - 1 && (
          <Button
            flex="1"
            size="sm"
            rounded="xl"
            variant="outline"
            colorPalette="brand"
            onClick={formCreateOrganizationProfile.handleToNextStep}
          >
            Próximo
          </Button>
        )}
      </HStack>
    </Steps.Root>
  )
}

export default FormStepsRegister
