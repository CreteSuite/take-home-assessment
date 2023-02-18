import { Character } from '../../src/Character'

export const extractCharacterPropertiesForComparison = (character: Character) => {
  if (character.role === 'Alchemist') {
    return {
      role: character.role,
      health: character.health,
      strength: character.strength,
      cones: character.cones,
      healthPotions: character.healthPotions
    }
  }
  return {
    role: character.role,
    health: character.health,
    strength: character.strength,
    cones: character.cones,
  }
}
