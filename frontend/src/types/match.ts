import type { PlayerSymbol } from './player'

type Board = [
  [PlayerSymbol, PlayerSymbol, PlayerSymbol],
  [PlayerSymbol, PlayerSymbol, PlayerSymbol],
  [PlayerSymbol, PlayerSymbol, PlayerSymbol],
]

export type Match = {
  board: Board
  currentPlayer: PlayerSymbol
}
