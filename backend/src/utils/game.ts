import type { Match, WinningCombination } from '@app-types/game'

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

export function isInvalidMove(row: number, col: number, match: Match) {
  if (row < 0 || row > 2 || col < 0 || col > 2) {
    return true
  }

  return match.board[row]![col] !== ''
}

export function isWinningMove(match: Match, player: string) {
  return winningCombinations.some((combination) =>
    combination.every(([row, col]) => match.board[row]![col] === player)
  )
}
