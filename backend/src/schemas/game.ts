import { z } from 'zod'

export const messageSchema = z.object({
  status: z.enum(['connected', 'searching', 'playing']).nonoptional(),
  details: z.string().min(1).optional(),
})

export const closeEventSchema = z.object({
  id: z.uuid().nonoptional(),
})
