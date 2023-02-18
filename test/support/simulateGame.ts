import { ConesOfDunshire } from '../../src/ConesOfDunshire'
import { Character } from '../../src/Character'
import { CharacterRole } from '../../src/types'

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

  // This ensures that the dice rolls are deterministic
  // When refactoring, ensure you use this same logic to control
  // the dice rolls, else tests using simluateGame will break
  let seed = diceSeed
  jest.spyOn(game as any, '_rollDice').mockImplementation(() => {
    const deterministicInt = Math.abs(Math.round(Math.sin(seed++) * 10000))
    const deterministicRoll = (deterministicInt % 6) + 1
    return deterministicRoll
  })

  return game.play()
}
