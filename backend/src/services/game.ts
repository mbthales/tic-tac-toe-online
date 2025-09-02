import { randomUUIDv7 } from 'bun'

import {
  addConnectedPlayer,
  addMatch,
  addSearchingPlayer,
  findConnectedPlayerByWebSocket,
  findMatchByPlayerId,
  findMatchByPlayerWebSocket,
  getFirstSearchingPlayer,
  getSearchingPlayersCount,
  removeConnectedPlayer,
  removeMatchById,
  removeMatchByPlayerWebSocket,
  removeSearchingPlayer,
} from '@states/game'
import { isInvalidMove, isWinningMove } from '@utils/game'

import type { Match, Message, Player } from '@app-types/game'
import type { ServerWebSocket } from 'bun'

function sendMessageToPlayers(match: Match, message: string) {
  if (match) {
    match.players.o.ws.send(message)
    match.players.x.ws.send(message)
  }
}

function createMatch(
  adversary: Player,
  data: Message,
  ws: ServerWebSocket<unknown>
) {
  const matchId = randomUUIDv7()
  const playerSymbol = Math.random() < 0.5 ? 'X' : 'O'

  const newMatch: Match = {
    id: matchId,
    players: {
      o: playerSymbol === 'O' ? { id: data.id, ws } : adversary,
      x: playerSymbol === 'X' ? { id: data.id, ws } : adversary,
    },
    board: [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ],
    currentPlayer: playerSymbol,
  }

  addMatch(newMatch)

  ws.send(
    JSON.stringify({
      status: 'playing',
      details: 'match found',
      playerSymbol: playerSymbol,
    })
  )

  adversary.ws.send(
    JSON.stringify({
      status: 'playing',
      details: 'match found',
      playerSymbol: playerSymbol === 'X' ? 'O' : 'X',
    })
  )

  sendMessageToPlayers(
    newMatch,
    JSON.stringify({
      status: 'playing',
      match: { board: newMatch.board, currentPlayer: newMatch.currentPlayer },
    })
  )
}

export function playerSearch(data: Message, ws: ServerWebSocket<unknown>) {
  addConnectedPlayer({ id: data.id, ws })

  if (!getSearchingPlayersCount()) {
    addSearchingPlayer({ id: data.id, ws })

    ws.send(JSON.stringify({ status: 'searching' }))
  } else {
    const adversary = getFirstSearchingPlayer()

    if (adversary) {
      createMatch(adversary, data, ws)
    }
  }
}

export function disconnectPlayer(ws: ServerWebSocket<unknown>) {
  const match = findMatchByPlayerWebSocket(ws)
  const player = findConnectedPlayerByWebSocket(ws)

  if (match && player) {
    sendMessageToPlayers(
      match,
      JSON.stringify({
        status: 'disconnected',
        details: player.id,
      })
    )
    removeMatchByPlayerWebSocket(ws)
    removeConnectedPlayer(ws)
    removeSearchingPlayer(ws)
  }
}

export function handlePlayerMove(data: Message, ws: ServerWebSocket<unknown>) {
  const match = findMatchByPlayerId(data.id)

  if (!match) {
    ws.send('You are not in a match')
    return
  }

  if (data.details) {
    const [rowStr, colStr] = data.details.split(',')

    if (rowStr && colStr) {
      const row = Number.parseInt(rowStr, 10)
      const col = Number.parseInt(colStr, 10)

      if (isInvalidMove(row, col, match)) {
        ws.send(JSON.stringify({ status: 'playing', details: 'invalid move' }))
        return
      }

      const currentPlayer = match.players.o.id === data.id ? 'O' : 'X'

      if (currentPlayer !== match.currentPlayer) {
        ws.send(JSON.stringify({ status: 'playing', details: 'not your turn' }))
        return
      }

      match.board[row]![col] = currentPlayer

      if (isWinningMove(match, currentPlayer)) {
        sendMessageToPlayers(
          match,
          JSON.stringify({
            status: 'finished',
            match: {
              board: match.board,
              currentPlayer: match.currentPlayer,
            },
            details: 'wins',
          })
        )
        removeMatchById(match.id)
        return
      }

      const isBoardFull = match.board.every((row) =>
        row.every((cell) => cell !== '')
      )

      if (isBoardFull) {
        sendMessageToPlayers(
          match,
          JSON.stringify({
            status: 'finished',
            details: 'tie',
            match: {
              board: match.board,
              currentPlayer: match.currentPlayer,
            },
          })
        )
        removeMatchById(match.id)
        return
      }

      match.currentPlayer = match.currentPlayer === 'X' ? 'O' : 'X'

      sendMessageToPlayers(
        match,
        JSON.stringify({
          status: 'playing',
          match: {
            board: match.board,
            currentPlayer: match.currentPlayer,
          },
        })
      )
    }
  }
}
