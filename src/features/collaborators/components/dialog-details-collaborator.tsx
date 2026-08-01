import {
  Avatar,
  CloseButton,
  DataList,
  Dialog,
  For,
  HStack,
  Portal,
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import React from 'react'

import { Status } from '@/components/ui/status'
import { FormatMask, formatterMask } from '@/shared/utils/formatted-mask'
import { contentCss } from '@/theme/styles/global-styles'

import type { CollaboratorEstablishmentModel } from '../types/collaborator-establishment.type'
import {
  mapColorStatusCollaborator,
  mapLabelStatusCollaborator,
} from '../types/status-collaborator.type'

interface DialogDetailsCollaboratorProps {
  collaborator: CollaboratorEstablishmentModel
  open: boolean
  onOpen: (open: boolean) => void
}

const DialogDetailsCollaborator = ({
  collaborator,
  open,
  onOpen,
}: DialogDetailsCollaboratorProps) => {
  const loadCollaboratorsDetails = [
    { label: 'Nome', value: collaborator.name },
    { label: 'E-mail', value: collaborator.email },
    {
      label: 'Celular',
      value: formatterMask(collaborator.cellphone, FormatMask.CELLPHONE),
    },
    { label: 'Especialidade', value: collaborator.specialty },
    { label: 'Horários', value: collaborator.workSchedule },
    { label: 'Status', value: collaborator.status },
    {
      label: 'Data de criação',
      value: dayjs(collaborator.createdAt).format('DD/MM/YYYY'),
    },
  ]

  const validTitleCollaborators = (title: string) => {
    const titles = new Set<string>(['Nome', 'Status'])
    return !titles.has(title)
  }

  return (
    <Dialog.Root
      motionPreset="slide-in-bottom"
      placement="center"
      open={open}
      onOpenChange={(e) => onOpen(e.open)}
    >
      <Portal>
        <Dialog.Backdrop backdropFilter="blur(4px)" bg="blackAlpha.300" />
        <Dialog.Positioner>
          <Dialog.Content css={contentCss}>
            <Dialog.Header>
              <Dialog.Title>Informações do colaborador</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb="8">
              <DataList.Root orientation="horizontal">
                <For each={loadCollaboratorsDetails}>
                  {(item) => (
                    <React.Fragment key={item.label}>
                      {validTitleCollaborators(item.label) && (
                        <DataList.Item>
                          <DataList.ItemLabel>{item.label}</DataList.ItemLabel>
                          <DataList.ItemValue>{item.value}</DataList.ItemValue>
                        </DataList.Item>
                      )}

                      {item.label === 'Nome' && (
                        <DataList.Item>
                          <DataList.ItemLabel>{item.label}</DataList.ItemLabel>
                          <DataList.ItemValue>
                            <HStack>
                              <Avatar.Root size="xs">
                                {collaborator.imageUrl && (
                                  <Avatar.Image src={collaborator.imageUrl} />
                                )}
                                <Avatar.Fallback />
                              </Avatar.Root>
                              {collaborator.name}
                            </HStack>
                          </DataList.ItemValue>
                        </DataList.Item>
                      )}

                      {item.label === 'Status' && (
                        <DataList.Item>
                          <DataList.ItemLabel>Status</DataList.ItemLabel>
                          <DataList.ItemValue>
                            <Status
                              size="sm"
                              colorPalette={
                                mapColorStatusCollaborator[collaborator.status]
                              }
                            >
                              {mapLabelStatusCollaborator(collaborator.status)}
                            </Status>
                          </DataList.ItemValue>
                        </DataList.Item>
                      )}
                    </React.Fragment>
                  )}
                </For>
              </DataList.Root>
            </Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="xs" rounded="full" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
export default DialogDetailsCollaborator
