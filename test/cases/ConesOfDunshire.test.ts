import { extractCharacterPropertiesForComparison } from '../support/extractCharacterProperties'
import { simulateGame } from '../support/simulateGame'

type Character = ReturnType<typeof simulateGame>[number]

const simplifyResults = (results: Character[]) => (
  results.map(extractCharacterPropertiesForComparison)
)

describe('Given a "ConesOfDunshire" game', () => {
  describe('with standard Characters', () => {
    let results: Character[]

    beforeAll(() => {
      results = simulateGame({
        map: 'Dunshire',
        diceSeed: 2934,
        characters: ['Ledgerman', 'Maverick', 'Alchemist', 'Villager', 'Farmer']
      })
    })
    it('returns the correct results', () => {
      expect(simplifyResults(results)).toEqual([
        { role: 'Alchemist', health: 19, strength: 9, cones: 4, healthPotions: 1 },
        { role: 'Maverick', health: 9, strength: 16, cones: 3 },
        { role: 'Villager', health: 11, strength: 13, cones: 1 },
        { role: 'Ledgerman', health: 10, strength: 10, cones: 0 },
        { role: 'Farmer', health: 7, strength: 0, cones: 0 }
      ])
    })
  })

  describe('with the rare case the Farmer wins', () => {
    let results: Character[]

    beforeAll(() => {
      results = simulateGame({
        map: 'Dunshire',
        diceSeed: 3360,
        characters: ['Ledgerman', 'Maverick', 'Alchemist', 'Villager', 'Farmer']
      })
    })

    it('returns the correct results', () => {
      expect(simplifyResults(results)).toEqual([
        { role: 'Farmer', health: 11, strength: 12, cones: 4 },
        { role: 'Villager', health: 13, strength: 7, cones: 2 },
        { role: 'Alchemist', health: 12, strength: 6, cones: 2, healthPotions: 2 },
        { role: 'Maverick', health: 10, strength: 12, cones: 0 },
        { role: 'Ledgerman', health: 10, strength: 10, cones: 0 }
      ])
    })
  })

  describe('with the duplicate characters', () => {
    let results: Character[]

    beforeAll(() => {
      results = simulateGame({
        map: 'Dunshire',
        diceSeed: 6023,
        characters: ['Ledgerman', 'Maverick', 'Maverick', 'Alchemist', 'Alchemist', 'Villager', 'Villager', 'Farmer', 'Farmer']
      })
    })

    it('returns the correct results', () => {
      expect(simplifyResults(results)).toEqual([
        { role: 'Maverick', health: 10, strength: 27, cones: 4 },
        { role: 'Villager', health: 17, strength: 17, cones: 3 },
        { role: 'Farmer', health: 11, strength: 10, cones: 1 },
        { role: 'Alchemist', health: 20, strength: 10, cones: 1, healthPotions: 3 },
        { role: 'Alchemist', health: 11, strength: 17, cones: 0, healthPotions: 3 },
        { role: 'Ledgerman', health: 10, strength: 10, cones: 0 },
        { role: 'Villager', health: 19, strength: 9, cones: 0 },
        { role: 'Maverick', health: 13, strength: 10, cones: 0 },
        { role: 'Farmer', health: 4, strength: 0, cones: 0 }
      ])
    })
  })
})
