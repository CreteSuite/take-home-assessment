import { extractCharacterPropertiesForComparison } from '../support/extractCharacterProperties'
import { simulateGame } from '../support/simulateGame'

type Character = ReturnType<typeof simulateGame>[number]

const simplifyResults = (results: Character[]) => (
  results.map(extractCharacterPropertiesForComparison)
)

describe('Given a "ConesOfBrimward" game', () => {
  describe('with standard Characters', () => {
    let results: Character[]

    beforeAll(() => {
      results = simulateGame({
        map: 'Brimward',
        diceSeed: 2934,
        characters: ['Ledgerman', 'Maverick', 'Alchemist', 'Villager', 'Farmer']
      })
    })
    it('returns the correct results', () => {
      expect(simplifyResults(results)).toEqual([
        { role: 'Maverick', health: 8, strength: 14, cones: 4 },
        { role: 'Villager', health: 8, strength: 7, cones: 1 },
        { role: 'Ledgerman', health: 10, strength: 10, cones: 0 },
        { role: 'Alchemist', health: 10, strength: 11, cones: 0, healthPotions: 3 },
        { role: 'Farmer', health: 10, strength: 4, cones: 0 }
      ])
    })
  })

  describe('with the rare case the Farmer wins', () => {
    let results: Character[]

    beforeAll(() => {
      results = simulateGame({
        map: 'Brimward',
        diceSeed: 4389,
        characters: ['Ledgerman', 'Maverick', 'Alchemist', 'Villager', 'Farmer']
      })
    })

    it('returns the correct results', () => {
      expect(simplifyResults(results)).toEqual([
        { role: 'Farmer', health: 10, strength: 12, cones: 4 },
        { role: 'Villager', health: 10, strength: 11, cones: 3 },
        { role: 'Ledgerman', health: 10, strength: 10, cones: 0 },
        { role: 'Alchemist', health: 6, strength: 11, cones: 0, healthPotions: 3 },
        { role: 'Maverick', health: 6, strength: 14, cones: 0 }
      ])
    })
  })

  describe('with the duplicate characters', () => {
    let results: Character[]

    beforeAll(() => {
      results = simulateGame({
        map: 'Brimward',
        diceSeed: 6023,
        characters: ['Ledgerman', 'Maverick', 'Maverick', 'Alchemist', 'Alchemist', 'Villager', 'Villager', 'Farmer', 'Farmer']
      })
    })

    it('returns the correct results', () => {
      expect(simplifyResults(results)).toEqual([
        { role: 'Maverick', health: 8, strength: 18, cones: 4 },
        { role: 'Villager', health: 6, strength: 12, cones: 2 },
        { role: 'Farmer', health: 10, strength: 10, cones: 1 },
        { role: 'Farmer', health: 12, strength: 12, cones: 1 },
        { role: 'Ledgerman', health: 10, strength: 10, cones: 0 },
        { role: 'Alchemist', health: 10, strength: 12, cones: 0, healthPotions: 3 },
        { role: 'Villager', health: 10, strength: 8, cones: 0 },
        { role: 'Maverick', health: 10, strength: 11, cones: 0 },
        { role: 'Alchemist', health: 8, strength: 10, cones: 0, healthPotions: 3 }
      ])
    })
  })
})
