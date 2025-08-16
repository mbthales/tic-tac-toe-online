import { z } from 'zod'

export const messageSchema = z.object({
  id: z.uuid().nonoptional(),
  status: z.enum(['connected', 'searching', 'playing']).nonoptional(),
  details: z.string().optional(),
})

export const closeEventSchema = z.object({
  id: z.uuid().nonoptional(),
})
