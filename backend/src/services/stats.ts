import { playersConnected, playersSearching } from '@states/game'

export const getGameStats = () => {
  return {
    playersConnected: playersConnected.length,
    playersSearching: playersSearching.length,
  }
}
