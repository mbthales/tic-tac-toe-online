import { randomUUIDv7 } from 'bun'

import type {
  CloseEvent,
  Match,
  Message,
  Player,
  WinningCombination,
} from '../types/game'
import type { ServerWebSocket } from 'bun'

const winningCombinations: WinningCombination[] = [
  // Rows
  [
    [0, 0], //[row, column]
    [0, 1],
    [0, 2],
  ],
  [
    [1, 0],
    [1, 1],
    [1, 2],
  ],
  [
    [2, 0],
    [2, 1],
    [2, 2],
  ],
  // Columns
  [
    [0, 0],
    [1, 0],
    [2, 0],
  ],
  [
    [0, 1],
    [1, 1],
    [2, 1],
  ],
  [
    [0, 2],
    [1, 2],
    [2, 2],
  ],
  // Diagonals
  [
    [0, 0],
    [1, 1],
    [2, 2],
  ],
  [
    [0, 2],
    [1, 1],
    [2, 0],
  ],
]

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

  sendMessageToPlayers(matchId, `Player Found. Match will begin`)
}

export function playerSearch(data: Message, ws: ServerWebSocket<unknown>) {
  playersConnected.push({ id: data.id, ws })

  if (playersSearching.length <= 0) {
    playersSearching.push({ id: data.id, ws })
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

function isInvalidMove(row: number, col: number, match: Match) {
  if (row < 0 || row > 2 || col < 0 || col > 2) {
    return true
  }

  return match.board[row]![col] !== ''
}

function isWinningMove(match: Match, player: string) {
  return winningCombinations.some((combination) =>
    combination.every(([row, col]) => match.board[row]![col] === player)
  )
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
        ws.send('Invalid move. Play again')
        return
      }

      const currentPlayer = match.players.o.id === data.id ? 'O' : 'X'

      if (currentPlayer !== match.currentPlayer) {
        ws.send("It's not your turn")
        return
      }

      match.board[row]![col] = currentPlayer

      if (isWinningMove(match, currentPlayer)) {
        sendMessageToPlayers(match.id, `Player ${data.id} wins`)
        matches = matches.filter((m) => m.id !== match.id)
        return
      }

      const isBoardFull = match.board.every((row) =>
        row.every((cell) => cell !== '')
      )

      if (isBoardFull) {
        sendMessageToPlayers(match.id, "It's a tie")
        matches = matches.filter((m) => m.id !== match.id)
        return
      }

      sendMessageToPlayers(
        match.id,
        `Player ${data.id} played at ${row},${col}`
      )

      match.currentPlayer = match.currentPlayer === 'X' ? 'O' : 'X'
    }
  }
}
