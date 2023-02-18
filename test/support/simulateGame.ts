import { ConesOfDunshire } from '../../src/ConesOfDunshire'
import { Character } from '../../src/Character'
import { CharacterRole } from '../../src/types'

// This ensures that the dice rolls are deterministic
// When refactoring, ensure you use the same internal logic to
// control the dice rolls, else tests using simulateGame will break
const mockDiceRoller = (diceSeed: number) => {
  let seed = diceSeed
  return () => {
    const deterministicInt = Math.abs(Math.round(Math.sin(seed++) * 10000))
    const deterministicRoll = (deterministicInt % 6) + 1
    return deterministicRoll
  }
}

export const simulateGame = ({
  map,
  diceSeed,
  characters
}: {
  map: string,
  diceSeed: number,
  characters: CharacterRole[]
}) => {
  if (map !== 'Dunshire') {
    throw new Error(`The "${map}" has not yet been implemented`)
  }

  const game = new ConesOfDunshire(
    characters.map((character) => {
      return Character.create(character)
    })
  )

  jest.spyOn(game as any, '_rollDice').mockImplementation(
    mockDiceRoller(diceSeed)
  )

  return game.play()
}
