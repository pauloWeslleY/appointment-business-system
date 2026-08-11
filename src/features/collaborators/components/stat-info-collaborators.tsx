import { type ColorPalette, For, SimpleGrid, Stat } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { getRouteApi } from '@tanstack/react-router'
import { useMemo } from 'react'

import { collaboratorsQueryKeys } from '../queries/collaborators-query-key'
import type { CollaboratorEstablishmentModel } from '../types/collaborator-establishment.type'
import {
  StatusCollaborator,
  type StatusCollaboratorType,
} from '../types/status-collaborator.type'

const dashboardSlugRoute = getRouteApi('/dashboard/$slug')

const StatInfoCollaborators = () => {
  const queryClient = useQueryClient()
  const establishment = dashboardSlugRoute.useLoaderData()
  const getCollaboratosList = queryClient.getQueryData<
    CollaboratorEstablishmentModel[]
  >(collaboratorsQueryKeys.establishment(establishment.id))

  const getStatCollaborators = useMemo<
    { title: string; value: string; color: ColorPalette }[]
  >(() => {
    const filteredCollaboratorsByEstablishment = (
      status: StatusCollaboratorType,
    ) => {
      return getCollaboratosList?.filter((service) => service.status === status)
    }

    const getTotalCollaborators: Record<
      StatusCollaboratorType,
      CollaboratorEstablishmentModel[] | undefined
    > = {
      [StatusCollaborator.PENDING]: filteredCollaboratorsByEstablishment(
        StatusCollaborator.PENDING,
      ),
      [StatusCollaborator.INACTIVE]: filteredCollaboratorsByEstablishment(
        StatusCollaborator.INACTIVE,
      ),
      [StatusCollaborator.ACTIVE]: filteredCollaboratorsByEstablishment(
        StatusCollaborator.ACTIVE,
      ),
    }

    return [
      {
        title: 'Total de colaboradores',
        value: String(getCollaboratosList?.length ?? 0),
        color: 'cyan',
      },
      {
        title: 'Total de colaboradores ativos',
        value: String(
          getTotalCollaborators[StatusCollaborator.ACTIVE]?.length ?? 0,
        ),
        color: 'green',
      },
      {
        title: 'Total de colaboradores inativos',
        value: String(
          getTotalCollaborators[StatusCollaborator.INACTIVE]?.length ?? 0,
        ),
        color: 'red',
      },
      {
        title: 'Total de colaboradores pendentes',
        value: String(
          getTotalCollaborators[StatusCollaborator.PENDING]?.length ?? 0,
        ),
        color: 'orange',
      },
    ]
  }, [getCollaboratosList])

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap="4" w="full">
      <For each={getStatCollaborators}>
        {(statService) => (
          <Stat.Root
            key={statService.title}
            p="4"
            shadow="xs"
            rounded="xl"
            bg={{ base: 'white', _dark: 'gray.950/40' }}
            outlineWidth="1px"
            outlineStyle="solid"
            outlineColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
            borderLeftWidth="5px"
            borderLeftColor={`${statService.color}.500`}
          >
            <Stat.Label>{statService.title}</Stat.Label>
            <Stat.ValueText>{statService.value}</Stat.ValueText>
          </Stat.Root>
        )}
      </For>
    </SimpleGrid>
  )
}

export default StatInfoCollaborators
