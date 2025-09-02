import type { Match } from './match'
import type { PlayerStatus, PlayerSymbol } from './player'

export type Message = {
  id: string
  status: PlayerStatus
  details?: string
  match?: Match
  playerSymbol?: PlayerSymbol
}
