import { z } from 'zod'

import { messageSchema } from '@schemas/game'

import type { ServerWebSocket } from 'bun'

type Position = [number, number]

type PlayerSymbol = 'X' | 'O' | ''

type Board = [
  [PlayerSymbol, PlayerSymbol, PlayerSymbol],
  [PlayerSymbol, PlayerSymbol, PlayerSymbol],
  [PlayerSymbol, PlayerSymbol, PlayerSymbol],
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
  currentPlayer: PlayerSymbol
}

export type Message = z.infer<typeof messageSchema>

export type WinningCombination = [Position, Position, Position]
