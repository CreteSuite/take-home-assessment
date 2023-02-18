import { simulateSingleTurn } from '../../support/simulateSingleTurn'

describe('Given the "Maverick"', () => {
  const role = 'Maverick'
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
      }).not.toThrowError()
      return character
    }

    describe('with a starting health of 5 and strength of 5', () => {
      beforeEach(() => {
        health = 5
        strength = 5
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

      describe('when the dice rolls are 5 and 2', () => {
        beforeEach(() => {
          takeTurn(5, 2)
        })
        it('loses 1 health for a roll-2 below 7', () => {
          expect(character.health).toBe(health + baseHealthAdjustment - 1)
        })
        it('gains no strength for an odd roll and gains 2 strenth for health less than 5', () => {
          expect(character.strength).toBe(strength + baseStrengthAdjustment + 2)
        })
      })

      describe('when the dice rolls are 5 and 3', () => {
        beforeEach(() => {
          takeTurn(5, 3)
        })
        it('loses 1 health for a roll-2 below 7', () => {
          expect(character.health).toBe(health + baseHealthAdjustment - 1)
        })
        it('gains 2 strength for an even roll and gains 2 strenth for health less than 5', () => {
          expect(character.strength).toBe(strength + baseStrengthAdjustment + 2 + 2)
        })
      })

      describe('when the dice rolls are 5 and 4', () => {
        beforeEach(() => {
          takeTurn(5, 4)
        })
        it('gains 1 health for a roll-2 greater than or equal to 7', () => {
          expect(character.health).toBe(health + baseHealthAdjustment + 1)
        })
        it('gains no strength for an odd roll and gains 1 strenth for health between 6 and 10', () => {
          expect(character.strength).toBe(strength + baseStrengthAdjustment + 1)
        })
      })

      describe('when the dice rolls are 6 and 4', () => {
        beforeEach(() => {
          takeTurn(6, 4)
        })
        it('gains 1 health for a roll-2 greater than or equal to 7', () => {
          expect(character.health).toBe(health + baseHealthAdjustment + 1)
        })
        it('gains 2 strength for an even roll and gains 1 strenth for health between 6 and 10', () => {
          expect(character.strength).toBe(strength + baseStrengthAdjustment + 2 + 1)
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

      describe('when the dice rolls are 5 and 2', () => {
        beforeEach(() => {
          takeTurn(5, 2)
        })
        it('faints from reaching 0 health', () => {
          expect(character.health).toBe(10)
          expect(character.strength).toBe(5)
        })
      })

      describe('when the dice rolls are 5 and 3', () => {
        beforeEach(() => {
          takeTurn(5, 3)
        })
        it('faints from reaching 0 health', () => {
          expect(character.health).toBe(10)
          expect(character.strength).toBe(5)
        })
      })

      describe('when the dice rolls are 5 and 4', () => {
        beforeEach(() => {
          takeTurn(5, 4)
        })
        it('gains 1 health for a roll-2 greater than or equal to 7', () => {
          expect(character.health).toBe(health + baseHealthAdjustment + 1)
        })
        it('gains no strength for an odd roll and gains 2 strenth for health less than 5', () => {
          expect(character.strength).toBe(strength + baseStrengthAdjustment + 2)
        })
      })

      describe('when the dice rolls are 6 and 4', () => {
        beforeEach(() => {
          takeTurn(6, 4)
        })
        it('gains 1 health for a roll-2 greater than or equal to 7', () => {
          expect(character.health).toBe(health + baseHealthAdjustment + 1)
        })
        it('gains 2 strength for an even roll and gains 2 strenth for health less than 5', () => {
          expect(character.strength).toBe(strength + baseStrengthAdjustment + 2 + 2)
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

      describe('when the dice rolls are 5 and 2', () => {
        beforeEach(() => {
          takeTurn(5, 2)
        })
        it('loses 1 health for a roll-2 below 7', () => {
          expect(character.health).toBe(health + baseHealthAdjustment - 1)
        })
        it('gains no strength for an odd roll', () => {
          expect(character.strength).toBe(strength + baseStrengthAdjustment)
        })
      })

      describe('when the dice rolls are 5 and 3', () => {
        beforeEach(() => {
          takeTurn(5, 3)
        })
        it('loses 1 health for a roll-2 below 7', () => {
          expect(character.health).toBe(health + baseHealthAdjustment - 1)
        })
        it('gains 2 strength for an even roll, growing past 20', () => {
          expect(character.strength).toBe(strength + baseStrengthAdjustment + 2)
        })
      })

      describe('when the dice rolls are 5 and 4', () => {
        beforeEach(() => {
          takeTurn(5, 4)
        })
        it('prevents health from increasing above 20', () => {
          expect(character.health).toBe(health)
        })
        it('gains no strength for an odd roll', () => {
          expect(character.strength).toBe(strength + baseStrengthAdjustment)
        })
      })

      describe('when the dice rolls are 6 and 4', () => {
        beforeEach(() => {
          takeTurn(6, 4)
        })
        it('prevents health from increasing above 20', () => {
          expect(character.health).toBe(health + baseHealthAdjustment)
        })
        it('gains 2 strength for an even roll, growing past 20', () => {
          expect(character.strength).toBe(strength + baseStrengthAdjustment + 2)
        })
      })
    })

    describe('with a starting health of 20 and strength of 40', () => {
      beforeEach(() => {
        health = 20
        strength = 40
      })

      describe('when the dice rolls are 6 and 4', () => {
        beforeEach(() => {
          takeTurn(6, 4)
        })
        it('prevents health from increasing above 20', () => {
          expect(character.health).toBe(health + baseHealthAdjustment)
        })
        it('prevents strength from increasing above 40', () => {
          expect(character.strength).toBe(strength + baseStrengthAdjustment)
        })
      })
    })
  })

  describe('takes a turn on the Brimward map', () => {
    const baseStrengthAdjustment = -1
    const baseHealthAdjustment = -1

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
      }).not.toThrowError()
      return character
    }

    describe('with a starting health of 6 and strength of 5', () => {
      beforeEach(() => {
        health = 6
        strength = 5
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

      describe('when the dice rolls are 5 and 1 and 1', () => {
        beforeEach(() => {
          takeTurn(5, 1, 1)
        })
        it('loses 1 health for a roll-2 below 7', () => {
          expect(character.health).toBe(health + baseHealthAdjustment - 1)
        })
        it('gains no strength for an odd roll and gains 2 strenth for health less than 5', () => {
          expect(character.strength).toBe(strength + baseStrengthAdjustment + 2)
        })
      })

      describe('when the dice rolls are 5 and 2 and 1', () => {
        beforeEach(() => {
          takeTurn(5, 2, 1)
        })
        it('loses 1 health for a roll-2 below 7', () => {
          expect(character.health).toBe(health + baseHealthAdjustment - 1)
        })
        it('gains 2 strength for an even roll and gains 2 strenth for health less than 5', () => {
        })
      })

      describe('when the dice rolls are 5 and 2 and 2', () => {
        beforeEach(() => {
          takeTurn(5, 2, 2)
        })
        it('gains 1 health for a roll-2 greater than or equal to 7', () => {
          expect(character.health).toBe(health + baseHealthAdjustment + 1)
        })
        it('gains no strength for an odd roll and gains 1 strenth for health between 6 and 10', () => {
          expect(character.strength).toBe(strength + baseStrengthAdjustment + 1)
        })
      })

      describe('when the dice rolls are 6 and 2 and 2', () => {
        beforeEach(() => {
          takeTurn(6, 2, 2)
        })
        it('gains 1 health for a roll-2 greater than or equal to 7', () => {
          expect(character.health).toBe(health + baseHealthAdjustment + 1)
        })
        it('gains 2 strength for an even roll and gains 1 strenth for health between 6 and 10', () => {
          expect(character.strength).toBe(strength + baseStrengthAdjustment + 2 + 1)
        })
      })
    })

    describe('with a starting health of 1 and strength of 10', () => {
      beforeEach(() => {
        health = 1
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

      describe('when the dice rolls are 5 and 1 and 1', () => {
        beforeEach(() => {
          takeTurn(5, 1, 1)
        })
        it('faints from reaching 0 health', () => {
          expect(character.health).toBe(10)
          expect(character.strength).toBe(5)
        })
      })

      describe('when the dice rolls are 5 and 2 and 1', () => {
        beforeEach(() => {
          takeTurn(5, 2, 1)
        })
        it('faints from reaching 0 health', () => {
          expect(character.health).toBe(10)
          expect(character.strength).toBe(5)
        })
      })

      describe('when the dice rolls are 5 and 2 and 2', () => {
        beforeEach(() => {
          takeTurn(5, 2, 2)
        })
        it('gains 1 health for a roll-2 greater than or equal to 7', () => {
          expect(character.health).toBe(health + baseHealthAdjustment + 1)
        })
        it('gains no strength for an odd roll and gains 2 strenth for health less than 5', () => {
          expect(character.strength).toBe(strength + baseStrengthAdjustment + 2)
        })
      })

      describe('when the dice rolls are 6 and 2 nd 2', () => {
        beforeEach(() => {
          takeTurn(6, 2, 2)
        })
        it('gains 1 health for a roll-2 greater than or equal to 7', () => {
          expect(character.health).toBe(health + baseHealthAdjustment + 1)
        })
        it('gains 2 strength for an even roll and gains 2 strenth for health less than 5', () => {
          expect(character.strength).toBe(strength + baseStrengthAdjustment + 2 + 2)
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

      describe('when the dice rolls are 5 and 1 and 1', () => {
        beforeEach(() => {
          takeTurn(5, 1, 1)
        })
        it('loses 1 health for a roll-2 below 7', () => {
          expect(character.health).toBe(health + baseHealthAdjustment - 1)
        })
        it('gains no strength for an odd roll', () => {
          expect(character.strength).toBe(strength + baseStrengthAdjustment)
        })
      })

      describe('when the dice rolls are 5 and 2 and 1', () => {
        beforeEach(() => {
          takeTurn(5, 2, 1)
        })
        it('loses 1 health for a roll-2 below 7', () => {
          expect(character.health).toBe(health + baseHealthAdjustment - 1)
        })
        it('gains 2 strength for an even roll, growing past 20', () => {
          expect(character.strength).toBe(strength + baseStrengthAdjustment + 2)
        })
      })

      describe('when the dice rolls are 5 and 2 and 2', () => {
        beforeEach(() => {
          takeTurn(5, 2, 2)
        })
        it('prevents health from increasing above 20', () => {
          expect(character.health).toBe(health + baseHealthAdjustment)
        })
        it('gains no strength for an odd roll', () => {
          expect(character.strength).toBe(strength + baseStrengthAdjustment)
        })
      })

      describe('when the dice rolls are 6 and 2 and 2', () => {
        beforeEach(() => {
          takeTurn(6, 2, 2)
        })
        it('prevents health from increasing above 20', () => {
          expect(character.health).toBe(health + baseHealthAdjustment)
        })
        it('gains 2 strength for an even roll, growing past 20', () => {
          expect(character.strength).toBe(strength + baseStrengthAdjustment + 2)
        })
      })
    })

    describe('with a starting health of 20 and strength of 40', () => {
      beforeEach(() => {
        health = 20
        strength = 40
      })

      describe('when the dice rolls are 6 and 3 and 1', () => {
        beforeEach(() => {
          takeTurn(6, 3, 1)
        })
        it('prevents health from increasing above 20', () => {
          expect(character.health).toBe(health + baseHealthAdjustment)
        })
        it('prevents strength from increasing above 40', () => {
          expect(character.strength).toBe(strength + baseStrengthAdjustment)
        })
      })
    })
  })
})
