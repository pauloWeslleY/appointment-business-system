import {
  Badge,
  Button,
  CloseButton,
  DataList,
  Dialog,
  For,
  Portal,
  Skeleton,
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'

import { toaster } from '@/components/ui/toaster'
import { formattedDateAndHours } from '@/shared/utils/formatted-date'
import { contentCss } from '@/theme/styles/global-styles'

import { taxInformationDocumentQueryOptions } from '../queries/tax-information.query-options'
import { mapTaxIdType } from '../types/tax-id.type'
import { mapStatusLegalEntity } from '../types/tax-information-status.type'

interface DialogDocumentTaxInformationProps {
  open: boolean
  onOpen: (open: boolean) => void
}

const DialogDocumentTaxInformation = ({
  open,
  onOpen,
}: DialogDocumentTaxInformationProps) => {
  const {
    data: taxInformationDocument,
    error: errorTaxInformationDocument,
    isLoading: isLoadingTaxInformationDocument,
  } = useQuery(
    taxInformationDocumentQueryOptions(
      sessionStorage.getItem('selected_legal_entity_id') ?? '',
    ),
  )

  const handleDialogDocumentTaxInformation = (open: boolean) => {
    if (errorTaxInformationDocument) {
      toaster.error({
        title: 'Erro ao carregar informações fiscais',
        description: errorTaxInformationDocument.message,
      })
      return
    }
    onOpen(open)
  }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(e) => handleDialogDocumentTaxInformation(e.open)}
      placement="center"
      motionPreset="slide-in-bottom"
      size="sm"
    >
      <Portal>
        <Dialog.Backdrop backdropFilter="blur(4px)" bg="blackAlpha.300" />
        <Dialog.Positioner>
          <Dialog.Content css={contentCss}>
            <Dialog.Header>
              <Dialog.Title>Informações dos Dados Fiscais</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              {isLoadingTaxInformationDocument && (
                <Skeleton w="full" h="100px" rounded="lg" />
              )}

              {!isLoadingTaxInformationDocument && taxInformationDocument && (
                <DataList.Root>
                  <For
                    each={[
                      {
                        label: 'Razão Social',
                        value: taxInformationDocument.legalEntity.legalName,
                      },
                      {
                        label: 'Nome fantasia',
                        value: taxInformationDocument.legalEntity.tradeName,
                      },
                      {
                        label: 'Tipo do documento',
                        value: taxInformationDocument.legalEntity.taxIdType,
                      },
                      {
                        label: 'Documento',
                        value: mapTaxIdType(
                          taxInformationDocument.legalEntity.taxId,
                          taxInformationDocument.legalEntity.taxIdType,
                        ),
                      },
                      {
                        label: 'Status',
                        value: mapStatusLegalEntity(
                          taxInformationDocument.legalEntity.status,
                        ),
                      },
                      {
                        label: 'Criado em',
                        value: formattedDateAndHours(
                          taxInformationDocument.legalEntity.createdAt,
                          true,
                        ),
                      },
                      {
                        label: 'Ultima atualização em',
                        value: formattedDateAndHours(
                          taxInformationDocument.legalEntity.updatedAt,
                          true,
                        ),
                      },
                    ]}
                  >
                    {(legalEntity) => (
                      <DataList.Item key={legalEntity.label}>
                        <DataList.ItemLabel>
                          {legalEntity.label}
                        </DataList.ItemLabel>
                        <DataList.ItemValue>
                          {typeof legalEntity.value === 'object' ? (
                            <Badge
                              size="sm"
                              variant="subtle"
                              rounded="lg"
                              colorPalette={legalEntity.value.color}
                            >
                              {legalEntity.value.label}
                            </Badge>
                          ) : (
                            legalEntity.value
                          )}
                        </DataList.ItemValue>
                      </DataList.Item>
                    )}
                  </For>
                </DataList.Root>
              )}
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button
                  rounded="lg"
                  size="xs"
                  colorPalette="red"
                  disabled={isLoadingTaxInformationDocument}
                >
                  Fechar
                </Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" rounded="full" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default DialogDocumentTaxInformation
