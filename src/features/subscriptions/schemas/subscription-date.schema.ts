import { z } from 'zod'

export const subscriptionDateSchema = z.iso.datetime({ offset: true })
