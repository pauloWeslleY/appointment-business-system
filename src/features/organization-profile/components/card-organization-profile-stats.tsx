import {
  Badge,
  Box,
  Card,
  type CardRootProps,
  Flex,
  For,
  HStack,
  Icon,
  Separator,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import type { Member } from 'better-auth/client/plugins'
import { Building2, ShieldCheck, Store, UsersRound } from 'lucide-react'

import { getMemberRoleLabel, MEMBER_ROLES } from '@/shared/types/members.type'
import { cardSectionCss } from '@/theme/styles/global-styles'

import type { FullOrganization } from '../services/organization.service'
import type { GetOrganizationProfileResponse } from '../types/get-organization-profile.model'
import { mapStatusOrganizationProfile } from '../types/status-organization-profile.type'

interface CardOrganizationProfileStatsProps extends CardRootProps {
  organizationProfile: GetOrganizationProfileResponse
  organization: FullOrganization
}

const getStatsOrganizationProfile = (
  organization: CardOrganizationProfileStatsProps['organization'],
) => {
  const getMemberOwner = (member: Member) => member.role === MEMBER_ROLES.OWNER
  const filteredMembers = organization.members.filter(getMemberOwner)
  const memberOwner = organization.members.find(getMemberOwner)
  const totalMembers = filteredMembers.length.toString()
  const memberRole = getMemberRoleLabel(memberOwner?.role)

  return [
    { icon: Store, label: 'Estabelecimentos', value: '---' },
    { icon: UsersRound, label: 'Membros', value: totalMembers },
    { icon: ShieldCheck, label: 'Seu papel', value: memberRole },
  ]
}

const CardOrganizationProfileStats = ({
  organizationProfile,
  organization,
}: CardOrganizationProfileStatsProps) => {
  const statsOrganizationProfile = getStatsOrganizationProfile(organization)
  const statusOrganizationProfile = mapStatusOrganizationProfile(
    organizationProfile.status,
  )

  return (
    <Card.Root
      css={cardSectionCss}
      variant="outline"
      display="flex"
      flexDir="column"
      gap="4"
    >
      <Flex align="center" justify="space-between" gap="2">
        <HStack>
          <Flex
            p="4"
            align="center"
            justify="center"
            rounded="full"
            bg={{ _light: 'teal.100/60', _dark: 'teal.800/30' }}
          >
            <Icon as={Building2} />
          </Flex>

          <Box>
            <Text fontSize="md">{organizationProfile.legalName || '---'}</Text>
            <Text
              fontSize="sm"
              color={{ _light: 'gray.500', _dark: 'gray.600' }}
            >
              {organizationProfile.tradeName || '---'}
            </Text>
          </Box>
        </HStack>

        <Badge
          colorPalette={statusOrganizationProfile.color}
          variant="subtle"
          size="lg"
        >
          {statusOrganizationProfile.label}
        </Badge>
      </Flex>

      <Separator
        orientation="horizontal"
        borderColor={{ _light: 'slate.500', _dark: 'slate.800' }}
      />

      <SimpleGrid columns={{ base: 1, md: 3 }} gap="4">
        <For each={statsOrganizationProfile}>
          {(item) => (
            <VStack key={item.label} gap="2">
              <Icon
                as={item.icon}
                color={{ _light: 'teal.500', _dark: 'teal.300' }}
              />
              <Text
                fontSize="sm"
                fontWeight="bold"
                letterSpacing="wide"
                color={{ _light: 'slate.500', _dark: 'slate.300' }}
              >
                {item.value}
              </Text>
              <Text fontSize="xs">{item.label}</Text>
            </VStack>
          )}
        </For>
      </SimpleGrid>
    </Card.Root>
  )
}

export default CardOrganizationProfileStats
