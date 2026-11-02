import { mutationOptions } from '@tanstack/react-query'

import {
  createTaxInformationService,
  updateTaxInformationService,
} from '../services/tax-information.service'
import type {
  LegalEntityListApiResponseType,
  LegalEntityListItemApiResponseType,
} from '../types/tax-information-api-response.type'
import { taxInformationQueryKeys } from './tax-information.query-key'

export const taxInformationMutationOptions = {
  create: () => {
    return mutationOptions({
      mutationKey: ['create-tax-information'],
      mutationFn: createTaxInformationService,
      onSuccess: (data, _variables, _result, context) => {
        context.client.setQueryData<LegalEntityListApiResponseType>(
          taxInformationQueryKeys.list({}),
          (oldList) => {
            if (!oldList) {
              return
            }

            return {
              ...oldList,
              legalEntities: [...oldList.legalEntities, data.legalEntity],
            }
          },
        )
      },
    })
  },

  update: () => {
    return mutationOptions({
      mutationKey: ['update-tax-information'],
      mutationFn: updateTaxInformationService,
      onSuccess: async (updatedLegalEntity, variables, _result, context) => {
        await context.client.invalidateQueries({
          queryKey: taxInformationQueryKeys.document(variables.legalEntityId),
        })

        context.client.setQueryData<LegalEntityListItemApiResponseType>(
          taxInformationQueryKeys.summary(updatedLegalEntity.legalEntity.id),
          () => updatedLegalEntity.legalEntity,
        )

        context.client.setQueryData<LegalEntityListApiResponseType>(
          taxInformationQueryKeys.list({}),
          (oldList) => {
            if (!oldList) {
              return
            }

            return {
              ...oldList,
              legalEntities: oldList.legalEntities.map((item) =>
                item.id === updatedLegalEntity.legalEntity.id
                  ? updatedLegalEntity.legalEntity
                  : item,
              ),
            }
          },
        )
      },
    })
  },
}
