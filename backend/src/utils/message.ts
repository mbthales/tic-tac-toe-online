import type { Board, PlayerSymbol } from '@app-types/game'

export const createMessage = (data: object): string => {
  return JSON.stringify(data)
}

export const createSearchingMessage = () => {
  return createMessage({ status: 'searching' })
}

export const createMatchFoundMessage = (playerSymbol: string) => {
  return createMessage({
    status: 'playing',
    details: 'match found',
    playerSymbol,
  })
}

export const createFinishedMessage = (
  board: Board,
  currentPlayer: PlayerSymbol,
  details: string
) => {
  return createMessage({
    status: 'finished',
    match: {
      board,
      currentPlayer,
    },
    details,
  })
}

export const createPlayingMessage = (
  board: Board,
  currentPlayer: PlayerSymbol,
  details?: string
) => {
  return createMessage({
    status: 'playing',
    match: {
      board,
      currentPlayer,
    },
    details,
  })
}

export const createDisconnectedMessage = (playerId: string) => {
  return createMessage({
    status: 'disconnected',
    details: playerId,
  })
}
