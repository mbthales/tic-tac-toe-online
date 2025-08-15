import { safeParse } from 'zod'

import jsonValidator from '../utils/jsonValidator'

import type { ServerWebSocket } from 'bun'
import type { ZodType } from 'zod'

export function messageValidator<T>(
  ws: ServerWebSocket<unknown>,
  message: string,
  schema: ZodType<T>
): T | null {
  const validJson = jsonValidator(message)

  if (!validJson) {
    ws.send('Invalid message format')
    return null
  }

  const data = safeParse(schema, validJson)

  if (!data.success) {
    ws.send('Invalid message format')
    return null
  }

  return data.data
}
