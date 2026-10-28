import {
  Badge,
  Box,
  Button,
  Card,
  DataList,
  Flex,
  For,
  HStack,
  Icon,
  Separator,
  Skeleton,
  Spinner,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { Link } from '@tanstack/react-router'
import {
  Building2,
  LogIn,
  MailOpen,
  ShieldCheck,
  TimerIcon,
} from 'lucide-react'

import Logotipo from '@/components/logotipo'
import { mapLabelMemberRole } from '@/features/members/types/member-role.type'
import { formattedDateAndHours } from '@/shared/utils/formatted-date'

import { useAcceptInvitation } from '../hooks/use-accept-invitation'

interface AuthAcceptInvitationProps {
  invitationId?: string
}

const AuthAcceptInvitation = ({ invitationId }: AuthAcceptInvitationProps) => {
  const {
    invite,
    invitationPreview,
    isLoadingInvite,
    isLoadingInvitationPreview,
    isPendingAcceptInvitation,
    showButtonAcceptInvitation,
    mapInvitationStatus,
    handleAcceptInvitation,
  } = useAcceptInvitation(invitationId)

  if (isLoadingInvite) {
    return (
      <VStack colorPalette="teal">
        <Spinner color="colorPalette.600" />
        <Text color="colorPalette.600">Carregando...</Text>
      </VStack>
    )
  }

  return (
    <Box spaceY="4">
      <HStack justify="space-between">
        <Flex align="center" gap="2">
          <Logotipo variant="app" boxSize="10" />
          <Text fontWeight="bold" letterSpacing="wider">
            System Appointment
          </Text>
        </Flex>

        <Badge
          rounded="full"
          colorPalette={mapInvitationStatus.color}
          variant="subtle"
        >
          {mapInvitationStatus.label}
        </Badge>
      </HStack>

      <Stack>
        <Flex
          alignSelf="center"
          placeContent="center"
          p="4"
          w="fit"
          rounded="full"
          bg={{ _light: 'navy.200/60', _dark: 'navy.900/20' }}
        >
          <Icon
            as={MailOpen}
            boxSize="6"
            color={{ _light: 'sea.500', _dark: 'sea.300' }}
          />
        </Flex>

        <Box spaceY="2" textAlign="center">
          <Text as="h4" fontSize="lg" fontWeight="bold">
            Você foi convidado para uma equipe!
          </Text>
          <Text
            as="p"
            fontSize="sm"
            letterSpacing="wider"
            color={{ _light: 'slate.500', _dark: 'slate.400' }}
          >
            Uma organização deseja que você faça parte da equipe no System
            Appointment.
          </Text>
        </Box>
      </Stack>

      <Card.Root
        variant="outline"
        rounded="lg"
        borderColor={{ _light: 'slate.200', _dark: 'slate.900' }}
        bg={{ _light: 'slate.100', _dark: 'slate.900' }}
      >
        <Flex align="center" gap="2" p="4">
          <Icon
            as={Building2}
            boxSize="10"
            color={{ _light: 'sea.500', _dark: 'sea.300' }}
          />

          <div>
            <Text fontWeight="light" letterSpacing="wider">
              Organização convidante
            </Text>

            {isLoadingInvitationPreview && <Skeleton h="4" w="32" />}

            {!isLoadingInvitationPreview && (
              <Text fontWeight="bold" letterSpacing="wider">
                {invitationPreview?.organization?.name}
              </Text>
            )}
          </div>
        </Flex>

        <Separator
          mx="3"
          borderColor={{ _light: 'slate.200', _dark: 'slate.800' }}
        />

        <DataList.Root
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(min(200px, 100%), 1fr))"
          p="4"
        >
          <For
            each={[
              {
                title: 'Seu papel',
                value: mapLabelMemberRole(invite?.invitation.role).label,
                icon: ShieldCheck,
              },
              {
                title: 'Expiração',
                value: formattedDateAndHours(
                  invite?.invitation.expiresAt ?? null,
                  true,
                ),
                icon: TimerIcon,
              },
            ]}
          >
            {({ title, value, icon }) => (
              <DataList.Item>
                <DataList.ItemLabel>{title}</DataList.ItemLabel>
                <DataList.ItemValue>
                  <Icon as={icon} boxSize="4" mr="2" />
                  {value}
                </DataList.ItemValue>
              </DataList.Item>
            )}
          </For>
        </DataList.Root>
      </Card.Root>

      {showButtonAcceptInvitation ? (
        <Button w="full" rounded="lg" colorPalette="brand" asChild>
          <Link to="/establishment">
            Entrar <Icon as={LogIn} boxSize="4" />
          </Link>
        </Button>
      ) : (
        <Stack>
          <Button
            rounded="lg"
            colorPalette="brand"
            onClick={handleAcceptInvitation}
            loading={isPendingAcceptInvitation}
          >
            Aceitar Convite
          </Button>
          <Button rounded="lg" variant="outline" colorPalette="red">
            Recusar Convite
          </Button>
        </Stack>
      )}
    </Box>
  )
}

export default AuthAcceptInvitation
