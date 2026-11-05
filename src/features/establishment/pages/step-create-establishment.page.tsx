import { Alert, Button, ButtonGroup, Flex, For, Steps } from '@chakra-ui/react'
import { Link } from '@tanstack/react-router'

import FormCreateAddressPage from '@/features/address/pages/form-create-address.page'
import FormCreateOpeningHoursPage from '@/features/opening-hours/pages/form-create-opening-hours.page'

import StepSummaryCreateEstablishmentSuccess from '../components/step-summary-create-establishment-success'
import { storageEstablishment } from '../helpers/storage-establishment'
import { useStepCreateEstablishment } from '../hooks/use-step-create-establishment'
import FormCreateEstablishmentPage from './form-create-establishment.page'

const establishment = storageEstablishment.get()

const steps = [
  { title: 'Cadastrar Estabelecimento' },
  { title: 'Cadastrar Endereço' },
  { title: 'Cadastrar Horários' },
]

const StepCreateEstablishmentPage = () => {
  const {
    stepCreateEstablishment,
    onChangeStepCreateEstablishment,
    nextStepCreateEstablishment,
  } = useStepCreateEstablishment()

  function handleClearSessionEstablishment() {
    storageEstablishment.delete()
  }

  return (
    <Steps.Root
      step={stepCreateEstablishment}
      onStepChange={(e) => onChangeStepCreateEstablishment(e.step)}
      count={steps.length}
      variant="subtle"
    >
      <Steps.List flexWrap="wrap" gap="3">
        <For each={steps}>
          {(step, index) => (
            <Steps.Item
              key={index}
              index={index}
              title={step.title}
              flex={{ base: '1 1 100%', md: '1' }}
            >
              <Steps.Indicator />
              <Steps.Title>{step.title}</Steps.Title>
              <Steps.Separator />
            </Steps.Item>
          )}
        </For>
      </Steps.List>

      <Steps.Content index={0}>
        <FormCreateEstablishmentPage />
      </Steps.Content>

      <Steps.Content index={1}>
        <FormCreateAddressPage
          establishmentId={establishment?.id}
          onSaved={nextStepCreateEstablishment}
        />
      </Steps.Content>

      <Steps.Content index={2}>
        <FormCreateOpeningHoursPage
          establishmentId={establishment?.id}
          onSaved={nextStepCreateEstablishment}
        />
      </Steps.Content>

      <Steps.CompletedContent>
        {establishment && (
          <StepSummaryCreateEstablishmentSuccess
            slug={establishment.slug}
            establishmentId={establishment.id}
          />
        )}

        <Alert.Root status="success" variant="surface" rounded="lg" mt="2">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Estabelecimento cadastrado com sucesso!</Alert.Title>
            <Alert.Description>
              O estabelecimento foi cadastrado com sucesso no sistema.
            </Alert.Description>
          </Alert.Content>
        </Alert.Root>

        <Flex mt="2" gap="4" justify="flex-end" flexWrap="wrap">
          <Button
            asChild
            rounded="lg"
            variant="surface"
            onClick={handleClearSessionEstablishment}
          >
            <Link to="/establishment">Lista de estabelecimentos</Link>
          </Button>

          {establishment && (
            <Button
              asChild
              variant="surface"
              rounded="lg"
              onClick={handleClearSessionEstablishment}
            >
              <Link
                to="/establishment/$establishmentSlug"
                params={{ establishmentSlug: establishment.slug }}
                search={{ tab: 'edit' }}
              >
                Editar estabelecimento
              </Link>
            </Button>
          )}
        </Flex>
      </Steps.CompletedContent>

      <ButtonGroup size="xs" variant="subtle">
        {stepCreateEstablishment !== 0 && (
          <Steps.PrevTrigger asChild>
            <Button rounded="lg" disabled={establishment?.created}>
              Anterior
            </Button>
          </Steps.PrevTrigger>
        )}
        <Steps.NextTrigger asChild>
          <Button rounded="lg">Próximo</Button>
        </Steps.NextTrigger>
      </ButtonGroup>
    </Steps.Root>
  )
}

export default StepCreateEstablishmentPage
