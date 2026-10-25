import { Text } from '@chakra-ui/react'

import { useSubscriptionOrganizationContext } from '../hooks/use-subscription-organization-context'
import { SubscriptionSection } from './subscription-section'
import { SubscriptionSelect } from './subscription-select'

export function SubscriptionOrganizationSelect() {
  const {
    organizationId,
    organizationsQuery,
    organizationSelectionMutation,
    organizationSelectItems,
    handleOrganizationSelection,
  } = useSubscriptionOrganizationContext()
  return (
    <SubscriptionSection>
      <SubscriptionSelect
        id="subscription-organization"
        label="Organização"
        value={organizationId}
        disabled={
          organizationSelectionMutation.isPending ||
          organizationsQuery.isLoading
        }
        items={organizationSelectItems}
        onChange={handleOrganizationSelection}
      />

      {organizationsQuery.data?.length === 0 && (
        <Text mt="3">
          Sua conta ainda não possui uma organização. Conclua o cadastro da
          empresa antes de iniciar uma contratação.
        </Text>
      )}

      {organizationSelectionMutation.isPending && (
        <Text mt="3" role="status">
          Atualizando organização ativa…
        </Text>
      )}
    </SubscriptionSection>
  )
}
