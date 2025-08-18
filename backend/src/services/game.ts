import { randomUUIDv7 } from 'bun'

import { isInvalidMove, isWinningMove } from '@utils/game'

import type { CloseEvent, Match, Message, Player } from '@app-types/game'
import type { ServerWebSocket } from 'bun'

let playersConnected: Player[] = []
let playersSearching: Player[] = []
let matches: Match[] = []

function sendMessageToPlayers(matchId: string, message: string) {
  const match = matches.find((m) => m.id === matchId)

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

  matches.push(newMatch)

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
      playerSymbol: playerSymbol === 'X' ? 'X' : 'O',
    })
  )

  sendMessageToPlayers(
    matchId,
    JSON.stringify({
      status: 'playing',
      match: { board: newMatch.board, currentPlayer: newMatch.currentPlayer },
    })
  )
}

export function playerSearch(data: Message, ws: ServerWebSocket<unknown>) {
  playersConnected.push({ id: data.id, ws })

  if (playersSearching.length <= 0) {
    playersSearching.push({ id: data.id, ws })

    ws.send(JSON.stringify({ status: 'searching' }))
  } else {
    const adversary = playersSearching.shift()

    if (adversary) {
      createMatch(adversary, data, ws)
    }
  }
}

export function disconnectPlayer(
  data: CloseEvent,
  ws: ServerWebSocket<unknown>
) {
  playersConnected = playersConnected.filter((player) => player.id !== data.id)
  playersSearching = playersSearching.filter((player) => player.id !== data.id)
  matches = matches.filter(
    (match) => match.players.o.id === data.id || match.players.x.id === data.id
  )

  ws.send('Connection with the server closed')
}

export function handlePlayerMove(data: Message, ws: ServerWebSocket<unknown>) {
  const match = matches.find(
    (m) => m.players.o.id === data.id || m.players.x.id === data.id
  )

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
          match.id,
          JSON.stringify({
            status: 'finished',
            player: currentPlayer,
            details: 'wins',
          })
        )
        matches = matches.filter((m) => m.id !== match.id)
        return
      }

      const isBoardFull = match.board.every((row) =>
        row.every((cell) => cell !== '')
      )

      if (isBoardFull) {
        const data = {
          status: 'finished',
          details: 'tie',
        }
        sendMessageToPlayers(match.id, JSON.stringify({ data }))
        matches = matches.filter((m) => m.id !== match.id)
        return
      }

      match.currentPlayer = match.currentPlayer === 'X' ? 'O' : 'X'

      sendMessageToPlayers(
        match.id,
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
