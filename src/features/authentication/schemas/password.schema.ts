import z from 'zod'

import { passwordCriteria } from '../constants/password-criteria'

export const InputPasswordSchema = z
  .string()
  .trim()
  .max(128, 'use no máximo 128 caracteres')
  .superRefine((value, ctx) => {
    for (const criterion of passwordCriteria) {
      if (!criterion.validate(value)) {
        ctx.addIssue({
          code: 'custom',
          message: `A senha deve atender ao seguinte critério: ${criterion.label}`,
        })
      }
    }
  })
