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
import CreateProfessionalForm from './create-professional-form'
import UpdateProfessionalForm from './update-professional-form'
interface ProfessionalEditorProps {
  establishmentId: string
  professionalId?: string
  onClose: () => void
}
const ProfessionalEditor = ({
  establishmentId,
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
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>
                {professionalId
                  ? 'Editar profissional'
                  : 'Cadastrar profissional'}
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              {!professionalId && (
                <CreateProfessionalForm
                  establishmentId={establishmentId}
                  onSaved={onClose}
                />
              )}
              {professionalId && isPending && (
                <Spinner aria-label="Carregando profissional" />
              )}
              {professionalId && error && (
                <Stack>
                  <Text role="alert">{error.message}</Text>
                  <Button onClick={() => refetch()}>Tentar novamente</Button>
                </Stack>
              )}
              {professionalId && details && !error && (
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
