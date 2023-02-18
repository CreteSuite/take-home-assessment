export type CharacterRole = 'Alchemist' | 'Ledgerman' | 'Farmer' | 'Maverick' | 'Villager'

export interface Character {
  role: CharacterRole
  health: number
  strength: number
  cones: number
}

export interface GameEngine {
  play: (characters: Array<Character>) => Array<Character>
}
