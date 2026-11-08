import type z from 'zod'

import { type GetPanelAccessApiResponseSchema } from '../schemas/get-panel-access-api.response.schema'

export type PanelAccessApiType = z.infer<typeof GetPanelAccessApiResponseSchema>
