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
        diceSeed: 867,
        characters: ['Maverick', 'Alchemist', 'Villager']
      })
    })


    it('returns the correct results', () => {
      expect(simplifyResults(results)).toEqual([
        { role: 'Maverick', health: 10, strength: 18, cones: 4 },
        { role: 'Alchemist', health: 10, strength: 11, cones: 0, healthPotions: 3 },
        { role: 'Villager', health: 10, strength: 11, cones: 0 }
      ])
    })
  })

  describe('with the duplicate characters', () => {
    let results: Character[]

    beforeAll(() => {
      results = simulateGame({
        map: 'Brimward',
        diceSeed: 5309,
        characters: ['Maverick', 'Maverick', 'Alchemist', 'Alchemist', 'Villager', 'Villager']
      })
    })

    it('returns the correct results', () => {
      expect(simplifyResults(results)).toEqual([
        { role: 'Maverick', health: 10, strength: 16, cones: 4 },
        { role: 'Alchemist', health: 10, strength: 9, cones: 1, healthPotions: 3 },
        { role: 'Villager', health: 10, strength: 9, cones: 0 },
        { role: 'Villager', health: 10, strength: 7, cones: 0 },
        { role: 'Maverick', health: 8, strength: 14, cones: 0 },
        { role: 'Alchemist', health: 4, strength: 9, cones: 0, healthPotions: 3 }
      ])
    })
  })

  // Note to Candidate:
  // This test can be a bit nuanced depending on how Ledgerman is implemented
  // It is skipped and not required for your submission, but if you want to
  // double check the Ledgerman character, you can unskip this test
  describe.skip('with the Ledgerman Character', () => {
    let results: Character[]

    beforeAll(() => {
      results = simulateGame({
        map: 'Brimward',
        diceSeed: 42,
        characters: ['Ledgerman', 'Maverick', 'Alchemist', 'Villager']
      })
    })


    it('returns the correct results', () => {
      expect(simplifyResults(results)).toEqual([
        { role: 'Maverick', health: 2, strength: 29, cones: 4 },
        { role: 'Alchemist', health: 10, strength: 11, cones: 1, healthPotions: 3 },
        { role: 'Villager', health: 8, strength: 11, cones: 1 },
        { role: 'Ledgerman', health: 10, strength: 10, cones: 0 }
      ])
    })
  })
})
