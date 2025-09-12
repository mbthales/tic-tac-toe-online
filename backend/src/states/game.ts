import type { Match, Player } from '@app-types/game'
import type { ServerWebSocket } from 'bun'

export let playersConnected: Player[] = []
export let playersSearching: Player[] = []
export let matches: Match[] = []

export const addConnectedPlayer = (player: Player) => {
  playersConnected.push(player)
}

export const removeConnectedPlayer = (ws: ServerWebSocket<unknown>) => {
  playersConnected = playersConnected.filter((player) => player.ws !== ws)
}

export const findConnectedPlayerByWebSocket = (
  ws: ServerWebSocket<unknown>
) => {
  return playersConnected.find((player) => player.ws === ws)
}

export const addSearchingPlayer = (player: Player) => {
  playersSearching.push(player)
}

export const getFirstSearchingPlayer = () => {
  return playersSearching.shift()
}

export const getSearchingPlayersCount = () => {
  return playersSearching.length
}

export const removeSearchingPlayer = (ws: ServerWebSocket<unknown>) => {
  playersSearching = playersSearching.filter((player) => player.ws !== ws)
}

export const addMatch = (match: Match) => {
  matches.push(match)
}

export const removeMatchByPlayerWebSocket = (ws: ServerWebSocket<unknown>) => {
  matches = matches.filter(
    (m) => m.players.o.ws !== ws && m.players.x.ws !== ws
  )
}

export const removeMatchById = (matchId: string) => {
  matches = matches.filter((m) => m.id !== matchId)
}

export const findMatchByPlayerId = (playerId: string) => {
  return matches.find(
    (m) => m.players.o.id === playerId || m.players.x.id === playerId
  )
}

export const findMatchByPlayerWebSocket = (ws: ServerWebSocket<unknown>) => {
  return matches.find((m) => m.players.o.ws === ws || m.players.x.ws === ws)
}

export const findMatchById = (matchId: string) => {
  return matches.find((m) => m.id === matchId)
}
