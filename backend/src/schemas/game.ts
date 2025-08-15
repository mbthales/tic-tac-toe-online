import { z } from 'zod'

export const messageSchema = z.object({
  id: z.uuid().nonoptional(),
  status: z.enum(['searching', 'playing']).nonoptional(),
  details: z.string().min(1).optional(),
})

export const closeEventSchema = z.object({
  id: z.uuid().nonoptional(),
})
