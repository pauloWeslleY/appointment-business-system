import { Box, Button, HStack, Icon, Steps } from '@chakra-ui/react'
import { useNavigate } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'

import { useFormCreateOwner } from '@/features/owner/hooks/use-form-create-owner'

import FormCreateOwner from '../../owner/pages/form-create-owner'
import { useStepRegister } from '../hooks/use-step-register'
import FormRegister from '../pages/form-register.page'

const steps = ['Usuário', 'Proprietário'] as const

const FormStepsRegister = () => {
  const { stepRegister, setStepRegisterWithValidation } = useStepRegister()
  const formCreateOwner = useFormCreateOwner(setStepRegisterWithValidation)
  const navigate = useNavigate()

  return (
    <Box p={{ base: '4', md: '8', xl: '40' }}>
      <Steps.Root
        step={stepRegister}
        onStepChange={(e) => setStepRegisterWithValidation(e.step)}
        count={steps.length}
      >
        <Steps.List>
          {steps.map((step, index) => (
            <Steps.Item key={index} index={index} title={step}>
              <Steps.Indicator />
              <Steps.Title>{step}</Steps.Title>
              <Steps.Separator />
            </Steps.Item>
          ))}
        </Steps.List>

        <Steps.Content index={0}>
          <FormRegister />
        </Steps.Content>

        <Steps.Content index={1}>
          <FormCreateOwner {...formCreateOwner} />
        </Steps.Content>

        <Steps.CompletedContent
          display="flex"
          flexDir="column"
          textAlign="center"
          gap="4"
          mt="6"
        >
          Todos os passos foram concluídos!
          <Button
            variant="surface"
            rounded="xl"
            colorPalette="emerald"
            size="sm"
            loading={formCreateOwner.isPendingCreateOwner}
            onClick={() => navigate({ to: '/establishment' })}
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
              variant="subtle"
              colorPalette="secondary"
              rounded="xl"
              onClick={formCreateOwner.handleGoBackToPreviousStep}
            >
              Voltar
            </Button>
          )}
          {stepRegister === steps.length - 1 && (
            <Button
              flex="1"
              size="sm"
              variant="subtle"
              rounded="xl"
              colorPalette="emerald"
              onClick={formCreateOwner.handleGoBackToNextStep}
            >
              Próximo
            </Button>
          )}
        </HStack>
      </Steps.Root>
    </Box>
  )
}

export default FormStepsRegister
