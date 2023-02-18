import { Character } from './types'

export interface GameEngine {
  play: (characters: Array<Character>) => Array<Character>
}
