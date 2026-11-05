import {
  Button,
  CloseButton,
  Dialog,
  Portal,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react'

import { useProfessional } from '../hooks/use-professionals'
import UpdateProfessionalForm from './update-professional-form'

interface ProfessionalEditorProps {
  professionalId: string
  onClose: () => void
}

const ProfessionalEditor = ({
  professionalId,
  onClose,
}: ProfessionalEditorProps) => {
  const {
    data: details,
    isPending,
    error,
    refetch,
  } = useProfessional(professionalId)
  return (
    <Dialog.Root
      open
      onOpenChange={(event) => {
        if (!event.open) {
          onClose()
        }
      }}
      size="xl"
      scrollBehavior="inside"
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
          >
            <Dialog.Header>
              <Dialog.Title>Editar profissional</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              {isPending && <Spinner aria-label="Carregando profissional" />}
              {error && (
                <Stack>
                  <Text role="alert">{error.message}</Text>
                  <Button onClick={() => refetch()}>Tentar novamente</Button>
                </Stack>
              )}
              {details && !error && (
                <UpdateProfessionalForm
                  key={details.professional.id}
                  details={details}
                  onSaved={onClose}
                />
              )}
            </Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <CloseButton aria-label="Fechar" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default ProfessionalEditor
