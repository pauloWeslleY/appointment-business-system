import {
  Alert,
  Button,
  CloseButton,
  Dialog,
  For,
  Portal,
  Skeleton,
  Stack,
} from '@chakra-ui/react'

import { contentCss } from '@/theme/styles/global-styles'

import { useProfessionalDetails } from '../hooks/use-professionals'
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
    data: professionalDetails,
    isPending: isLoadingProfessionalDetails,
    error: professionalDetailsError,
    refetch: refetchProfessionalDetails,
  } = useProfessionalDetails(professionalId)

  return (
    <Dialog.Root
      open
      onOpenChange={(event) => {
        if (!event.open) {
          onClose()
        }
      }}
      size="xl"
      placement="center"
      motionPreset="slide-in-bottom"
      scrollBehavior="inside"
    >
      <Portal>
        <Dialog.Backdrop backdropFilter="blur(4px)" bg="blackAlpha.300" />
        <Dialog.Positioner>
          <Dialog.Content css={contentCss}>
            <Dialog.Header>
              <Dialog.Title>Editar profissional</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              {isLoadingProfessionalDetails && (
                <Stack
                  gap="2"
                  role="status"
                  aria-label="Carregando profissional"
                >
                  <For each={[1, 2, 3]}>
                    {(skeletonRow) => (
                      <Skeleton key={skeletonRow} height="10" rounded="xl" />
                    )}
                  </For>
                </Stack>
              )}

              {professionalDetailsError && (
                <Alert.Root status="error" variant="subtle" rounded="lg">
                  <Alert.Indicator />
                  <Stack>
                    <Alert.Title>
                      {professionalDetailsError.message}
                    </Alert.Title>
                    <Button
                      size="sm"
                      rounded="lg"
                      variant="outline"
                      alignSelf="start"
                      onClick={() => refetchProfessionalDetails()}
                    >
                      Tentar novamente
                    </Button>
                  </Stack>
                </Alert.Root>
              )}

              {professionalDetails && !professionalDetailsError && (
                <UpdateProfessionalForm
                  key={professionalDetails.professional.id}
                  details={professionalDetails}
                  onSaved={onClose}
                  onCancel={onClose}
                />
              )}
            </Dialog.Body>

            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" rounded="full" aria-label="Fechar" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default ProfessionalEditor
