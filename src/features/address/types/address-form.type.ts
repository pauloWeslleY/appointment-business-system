import type { z } from 'zod'

import type { AddressFormDataSchema } from '../schemas/form-address.schema'

export type AddressFormData = z.infer<typeof AddressFormDataSchema>
