import { z } from 'zod'

import { closeEventSchema, messageSchema } from '@schemas/game'

import type { ServerWebSocket } from 'bun'

type Position = [number, number]

type CellValue = 'X' | 'O' | ''

type Board = [
  [CellValue, CellValue, CellValue],
  [CellValue, CellValue, CellValue],
  [CellValue, CellValue, CellValue],
]

export type Player = {
  id: string
  ws: ServerWebSocket<unknown>
}

export type Match = {
  id: string
  players: {
    o: Player
    x: Player
  }
  board: Board
  currentPlayer: 'X' | 'O'
}

export type Message = z.infer<typeof messageSchema>

export type CloseEvent = z.infer<typeof closeEventSchema>

export type WinningCombination = [Position, Position, Position]
