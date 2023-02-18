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
        diceSeed: 867,
        characters: ['Maverick', 'Alchemist', 'Villager']
      })
    })


    it('returns the correct results', () => {
      expect(simplifyResults(results)).toEqual([
        { role: 'Villager', health: 17, strength: 9, cones: 4 },
        { role: 'Maverick', health: 13, strength: 7, cones: 2 },
        { role: 'Alchemist', health: 13, strength: 5, cones: 0, healthPotions: 3 }
      ])
    })
  })

  describe('with the duplicate characters', () => {
    let results: Character[]

    beforeAll(() => {
      results = simulateGame({
        map: 'Dunshire',
        diceSeed: 5309,
        characters: ['Maverick', 'Maverick', 'Alchemist', 'Alchemist', 'Villager', 'Villager']
      })
    })

    it('returns the correct results', () => {
      expect(simplifyResults(results)).toEqual([
        { role: 'Maverick', health: 13, strength: 14, cones: 4 },
        { role: 'Maverick', health: 11, strength: 10, cones: 2 },
        { role: 'Alchemist', health: 12, strength: 10, cones: 0, healthPotions: 3 },
        { role: 'Villager', health: 13, strength: 7, cones: 0 },
        { role: 'Villager', health: 9, strength: 9, cones: 0 },
        { role: 'Alchemist', health: 11, strength: 9, cones: 0, healthPotions: 0 }
      ])
    })
  })

  // Note to Candidate:
  // This test can be very nuanced depending on how Ledgerman is implemented
  // It is skipped and not required for your submission, but if you want to
  // double check the Ledgerman character, you can unskip this test
  describe.skip('with the Ledgerman Character', () => {
    let results: Character[]

    beforeAll(() => {
      results = simulateGame({
        map: 'Dunshire',
        diceSeed: 42,
        characters: ['Ledgerman', 'Maverick', 'Alchemist', 'Villager']
      })
    })


    it('returns the correct results', () => {
      expect(simplifyResults(results)).toEqual([
        { role: 'Maverick', health: 10, strength: 16, cones: 4 },
        { role: 'Villager', health: 10, strength: 10, cones: 0 },
        { role: 'Alchemist', health: 9, strength: 11, cones: 0, healthPotions: 3 },
        { role: 'Ledgerman', health: 10, strength: 10, cones: 0 }
      ])
    })
  })
})
