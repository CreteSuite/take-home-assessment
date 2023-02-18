import { simulateSingleTurn } from '../../support/simulateSingleTurn'

describe('Given the "Villager"', () => {
  const role = 'Villager'
  let character: ReturnType<typeof simulateSingleTurn<typeof role>>
  let health: number
  let strength: number

  describe('takes a turn on the Dunshire map', () => {
    const baseHealthAdjustment = 0
    const baseStrengthAdjustment = -1

    const takeTurn = (dice1: number, dice2: number) => {
      expect(() => {
        character = simulateSingleTurn({
          map: 'Dunshire',
          role,
          health,
          strength,
          dice1,
          dice2,
        })
      }).not.toThrow()
      return character
    }

    describe('with a starting health of 3 and strength of 3', () => {
      beforeEach(() => {
        health = 3
        strength = 3
      })

      describe('when the dice rolls are 1 and 1', () => {
        beforeEach(() => {
          takeTurn(1, 1)
        })
        it('skips its turn', () => {
          expect(character.health).toBe(health)
          expect(character.strength).toBe(strength)
        })
      })

      describe('when the dice rolls are 1 and 2', () => {
        beforeEach(() => {
          takeTurn(1, 2)
        })
        it('loses 1 health for a roll below 7', () => {
          expect(character.health).toBe(health + baseHealthAdjustment - 1)
        })
        it('gains no strength for an odd roll', () => {
          expect(character.strength).toBe(strength + baseStrengthAdjustment)
        })
      })

      describe('when the dice rolls are 3 and 3', () => {
        beforeEach(() => {
          takeTurn(3, 3)
        })
        it('loses 1 health for a roll below 7', () => {
          expect(character.health).toBe(health + baseHealthAdjustment - 1)
        })
        it('gains 2 strength for an even roll', () => {
          expect(character.strength).toBe(strength + baseStrengthAdjustment + 2)
        })
      })

      describe('when the dice rolls are 3 and 4', () => {
        beforeEach(() => {
          takeTurn(3, 4)
        })
        it('gains 1 health for a roll greater than or equal to 7', () => {
          expect(character.health).toBe(health + baseHealthAdjustment + 1)
        })
        it('gains no strength for an odd roll', () => {
          expect(character.strength).toBe(strength + baseStrengthAdjustment)
        })
      })

      describe('when the dice rolls are 4 and 4', () => {
        beforeEach(() => {
          takeTurn(4, 4)
        })
        it('gains 1 health for a roll greater than or equal to 7', () => {
          expect(character.health).toBe(health + baseHealthAdjustment + 1)
        })
        it('gains 2 strength for an even roll', () => {
          expect(character.strength).toBe(strength + baseStrengthAdjustment + 2)
        })
      })
    })

    describe('with a starting health of 1 and strength of 10', () => {
      beforeEach(() => {
        health = 1
        strength = 10
      })

      describe('when the dice rolls are 1 and 1', () => {
        beforeEach(() => {
          takeTurn(1, 1)
        })
        it('skips its turn', () => {
          expect(character.health).toBe(health)
          expect(character.strength).toBe(strength)
        })
      })

      describe('when the dice rolls are 1 and 2', () => {
        beforeEach(() => {
          takeTurn(1, 2)
        })
        it('faints from reaching 0 health', () => {
          expect(character.health).toBe(10)
          expect(character.strength).toBe(5)
        })
      })

      describe('when the dice rolls are 3 and 3', () => {
        beforeEach(() => {
          takeTurn(3, 3)
        })
        it('faints from reaching 0 health', () => {
          expect(character.health).toBe(10)
          expect(character.strength).toBe(5)
        })
      })

      describe('when the dice rolls are 3 and 4', () => {
        beforeEach(() => {
          takeTurn(3, 4)
        })
        it('gains 1 health for a roll greater than or equal to 7', () => {
          expect(character.health).toBe(health + baseHealthAdjustment + 1)
        })
        it('gains no strength for an odd roll', () => {
          expect(character.strength).toBe(strength + baseStrengthAdjustment)
        })
      })

      describe('when the dice rolls are 4 and 4', () => {
        beforeEach(() => {
          takeTurn(4, 4)
        })
        it('gains 1 health for a roll greater than or equal to 7', () => {
          expect(character.health).toBe(health + baseHealthAdjustment + 1)
        })
        it('gains 2 strength for an even roll', () => {
          expect(character.strength).toBe(strength + baseStrengthAdjustment + 2)
        })
      })
    })

    describe('with a starting health of 20 and strength of 20', () => {
      beforeEach(() => {
        health = 20
        strength = 20
      })

      describe('when the dice rolls are 1 and 1', () => {
        beforeEach(() => {
          takeTurn(1, 1)
        })
        it('skips its turn', () => {
          expect(character.health).toBe(health)
          expect(character.strength).toBe(strength)
        })
      })

      describe('when the dice rolls are 1 and 2', () => {
        beforeEach(() => {
          takeTurn(1, 2)
        })
        it('loses 1 health for a roll below 7', () => {
          expect(character.health).toBe(health + baseHealthAdjustment  - 1)
        })
        it('gains no strength for an odd roll', () => {
          expect(character.strength).toBe(strength + baseStrengthAdjustment)
        })
      })

      describe('when the dice rolls are 3 and 3', () => {
        beforeEach(() => {
          takeTurn(3, 3)
        })
        it('loses 1 health for a roll below 7', () => {
          expect(character.health).toBe(health + baseHealthAdjustment - 1)
        })
        it('prevents strength from increasing above 20, then still loses 1 normally at the end of the turn', () => {
          expect(character.strength).toBe(strength + baseStrengthAdjustment)
        })
      })

      describe('when the dice rolls are 3 and 4', () => {
        beforeEach(() => {
          takeTurn(3, 4)
        })
        it('prevents health from increasing above 20', () => {
          expect(character.health).toBe(health + baseHealthAdjustment)
        })
        it('gains no strength for an odd roll', () => {
          expect(character.strength).toBe(strength + baseStrengthAdjustment)
        })
      })

      describe('when the dice rolls are 4 and 4', () => {
        beforeEach(() => {
          takeTurn(4, 4)
        })
        it('prevents health from increasing above 20', () => {
          expect(character.health).toBe(health + baseHealthAdjustment)
        })
        it('prevents strength from increasing above 20, then still loses 1 normally at the end of the turn', () => {
          expect(character.strength).toBe(strength + baseStrengthAdjustment)
        })
      })
    })
  })

  describe('takes a turn on the Brimward map', () => {
    const baseHealthAdjustment = -1
    const baseStrengthAdjustment = -1

    const takeTurn = (dice1: number, dice2: number, dice3: number) => {
      expect(() => {
        character = simulateSingleTurn({
          map: 'Brimward',
          role,
          health,
          strength,
          dice1,
          dice2,
          dice3,
        })
      }).not.toThrow()
      return character
    }

    describe('with a starting health of 3 and strength of 3', () => {
      beforeEach(() => {
        health = 3
        strength = 3
      })

      describe('when the dice rolls are 1 and 1 and 1', () => {
        beforeEach(() => {
          takeTurn(1, 1, 1)
        })
        it('skips its turn', () => {
          expect(character.health).toBe(health)
          expect(character.strength).toBe(strength)
        })
      })

      describe('when the dice rolls are 1 and 2 and 2', () => {
        beforeEach(() => {
          takeTurn(1, 2, 2)
        })
        it('loses 1 health for a roll below 7', () => {
          expect(character.health).toBe(health + baseHealthAdjustment - 1)
        })
        it('gains no strength for an odd roll', () => {
          expect(character.strength).toBe(strength + baseStrengthAdjustment)
        })
      })

      describe('when the dice rolls are 2 and 2 and 2', () => {
        beforeEach(() => {
          takeTurn(2, 2, 2)
        })
        it('loses 1 health for a roll below 7', () => {
          expect(character.health).toBe(health + baseHealthAdjustment - 1)
        })
        it('gains 2 strength for an even roll', () => {
          expect(character.strength).toBe(strength + baseStrengthAdjustment + 2)
        })
      })

      describe('when the dice rolls are 3 and 2 and 2', () => {
        beforeEach(() => {
          takeTurn(3, 2, 2)
        })
        it('gains 1 health for a roll greater than or equal to 7', () => {
          expect(character.health).toBe(health + baseHealthAdjustment  + 1)
        })
        it('gains no strength for an odd roll', () => {
          expect(character.strength).toBe(strength + baseStrengthAdjustment)
        })
      })

      describe('when the dice rolls are 4 and 2 and 2', () => {
        beforeEach(() => {
          takeTurn(4, 2, 2)
        })
        it('gains 1 health for a roll greater than or equal to 7', () => {
          expect(character.health).toBe(health + baseHealthAdjustment + 1)
        })
        it('gains 2 strength for an even roll', () => {
          expect(character.strength).toBe(strength + baseStrengthAdjustment + 2)
        })
      })
    })

    describe('with a starting health of 2 and strength of 10', () => {
      beforeEach(() => {
        health = 2
        strength = 10
      })

      describe('when the dice rolls are 1 and 1 and 1', () => {
        beforeEach(() => {
          takeTurn(1, 1, 1)
        })
        it('skips its turn', () => {
          expect(character.health).toBe(health)
          expect(character.strength).toBe(strength)
        })
      })

      describe('when the dice rolls are 1 and 2 and 2', () => {
        beforeEach(() => {
          takeTurn(1, 2, 2)
        })
        it('faints from reaching 0 health', () => {
          expect(character.health).toBe(10)
          expect(character.strength).toBe(5)
        })
      })

      describe('when the dice rolls are 2 and 2 and 2', () => {
        beforeEach(() => {
          takeTurn(2, 2, 2)
        })
        it('faints from reaching 0 health during its end of turn health loss', () => {
          expect(character.health).toBe(10)
          expect(character.strength).toBe(6)
        })
      })

      describe('when the dice rolls are 3 and 2 and 2', () => {
        beforeEach(() => {
          takeTurn(3, 2, 2)
        })
        it('gains 1 health for a roll greater than or equal to 7', () => {
          expect(character.health).toBe(health + baseHealthAdjustment + 1)
        })
        it('gains no strength for an odd roll', () => {
          expect(character.strength).toBe(strength + baseStrengthAdjustment)
        })
      })

      describe('when the dice rolls are 4 and 2 and 2', () => {
        beforeEach(() => {
          takeTurn(4, 2, 2)
        })
        it('gains 1 health for a roll greater than or equal to 7', () => {
          expect(character.health).toBe(health + baseHealthAdjustment + 1)
        })
        it('gains 2 strength for an even roll', () => {
          expect(character.strength).toBe(strength + baseStrengthAdjustment + 2)
        })
      })
    })

    describe('with a starting health of 20 and strength of 20', () => {
      beforeEach(() => {
        health = 20
        strength = 20
      })

      describe('when the dice rolls are 1 and 1 and 1', () => {
        beforeEach(() => {
          takeTurn(1, 1, 1)
        })
        it('skips its turn', () => {
          expect(character.health).toBe(health)
          expect(character.strength).toBe(strength)
        })
      })

      describe('when the dice rolls are 1 and 2 and 2', () => {
        beforeEach(() => {
          takeTurn(1, 2, 2)
        })
        it('loses 1 health for a roll below 7', () => {
          expect(character.health).toBe(health + baseHealthAdjustment - 1)
        })
        it('gains no strength for an odd roll', () => {
          expect(character.strength).toBe(strength + baseStrengthAdjustment)
        })
      })

      describe('when the dice rolls are 3 and 2 and 1', () => {
        beforeEach(() => {
          takeTurn(3, 2, 1)
        })
        it('loses 1 health for a roll below 7', () => {
          expect(character.health).toBe(health + baseHealthAdjustment - 1)
        })
        it('prevents strength from increasing above 20, then still loses 1 normally at the end of the turn', () => {
          expect(character.strength).toBe(strength + baseStrengthAdjustment)
        })
      })

      describe('when the dice rolls are 3 and 2 and 2', () => {
        beforeEach(() => {
          takeTurn(3, 2, 2)
        })
        it('loses 1 health for normal turn', () => {
          expect(character.health).toBe(health + baseHealthAdjustment)
        })
        it('gains no strength for an odd roll', () => {
          expect(character.strength).toBe(strength + baseStrengthAdjustment)
        })
      })

      describe('when the dice rolls are 4 and 2 and 2', () => {
        beforeEach(() => {
          takeTurn(4, 2, 2)
        })
        it('loses 1 health for normal turn', () => {
          expect(character.health).toBe(health + baseHealthAdjustment)
        })
        it('prevents strength from increasing above 20, then still loses 1 normally at the end of the turn', () => {
          expect(character.strength).toBe(strength + baseStrengthAdjustment)
        })
      })
    })
  })
})
