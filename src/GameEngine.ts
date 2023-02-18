import { Character } from './types'

export interface GameEngine {
  play: () => Array<Character>
}
