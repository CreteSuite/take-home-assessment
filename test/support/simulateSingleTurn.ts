import { ConesOfDunshire } from '../../src/ConesOfDunshire'
import { Character } from '../../src/Character'
import { CharacterRole } from '../../src/types'

 // a mock character that will get the first turn bonus, and win the game
const newMockCharacter = () => {
  const character = new Character('Villager')
  character.health = 100
  character.strength = 100
  character.cones = 3
  return character
}

export const simulateSingleTurn = <Role extends CharacterRole>({
  map,
  role,
  health,
  strength,
  dice1,
  dice2,
  dice3,
  healthPotions,
}: {
  map?: string,
  role: Role,
  health: number,
  strength: number,
  dice1: number,
  dice2: number,
  dice3?: number,
  healthPotions?: number,
}) => {
  if (map !== 'Dunshire') {
    throw new Error(`The "${map}" has not yet been implemented`)
  }

  const character = Character.create(role, health, strength)
  if (role === 'Alchemist') {
    character.healthPotions = healthPotions ?? 0
  }
  const game = new ConesOfDunshire([newMockCharacter(), character])
  jest.spyOn(game as any, '_rollDice')
    .mockReturnValueOnce(1) // first roll is for the dummy character
    .mockReturnValueOnce(1) // second roll is for the dummy character
    .mockReturnValueOnce(dice1)
    .mockReturnValueOnce(dice2)
  game.play()
  return character
}
