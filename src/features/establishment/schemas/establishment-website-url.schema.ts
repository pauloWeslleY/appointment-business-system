import { z } from 'zod'

import {
  ESTABLISHMENT_WEBSITE_MAX_LENGTH,
  ESTABLISHMENT_WEBSITE_PATH_MAX_LENGTH,
} from '../constants/establishment-website'

export const EstablishmentWebsiteUrlSchema = z
  .string()
  .max(ESTABLISHMENT_WEBSITE_MAX_LENGTH, 'Use no máximo 2048 caracteres.')

export const EstablishmentWebsiteUrlFormSchema = z
  .string()
  .trim()
  .max(ESTABLISHMENT_WEBSITE_MAX_LENGTH, 'Use no máximo 2048 caracteres.')

export const EstablishmentWebsitePathFormSchema =
  EstablishmentWebsiteUrlFormSchema.max(
    ESTABLISHMENT_WEBSITE_PATH_MAX_LENGTH,
    `Use no máximo ${ESTABLISHMENT_WEBSITE_PATH_MAX_LENGTH} caracteres.`,
  )
