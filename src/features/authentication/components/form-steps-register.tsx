import { Box, Button, ButtonGroup, Steps } from '@chakra-ui/react'

import { useFormStepRegister } from '@/shared/store/form-step-register'

import FormCreateOwner from '../../owner/pages/form-create-owner'
import FormRegister from '../pages/form-register.page'

const steps = [
  {
    title: 'Step 1',
    content: FormRegister,
  },
  {
    title: 'Step 2',
    content: FormCreateOwner,
  },
]

const FormStepsRegister = () => {
  const { step, setStep } = useFormStepRegister()

  return (
    <Box p={{ base: '4', md: '8', xl: '40' }}>
      <Steps.Root
        step={step}
        onStepChange={(e) => setStep(e.step)}
        count={steps.length}
      >
        <Steps.List>
          {steps.map((step, index) => (
            <Steps.Item key={index} index={index} title={step.title}>
              <Steps.Indicator />
              <Steps.Title>{step.title}</Steps.Title>
              <Steps.Separator />
            </Steps.Item>
          ))}
        </Steps.List>

        {steps.map((step, index) => (
          <Steps.Content key={index} index={index}>
            <step.content />
          </Steps.Content>
        ))}

        <Steps.CompletedContent>
          Todos os passos foram concluídos!
        </Steps.CompletedContent>

        <ButtonGroup size="sm" variant="outline">
          <Steps.PrevTrigger asChild>
            <Button rounded="xl">Voltar</Button>
          </Steps.PrevTrigger>
        </ButtonGroup>
      </Steps.Root>
    </Box>
  )
}

export default FormStepsRegister
