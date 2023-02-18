import { simulateSingleTurn } from '../../support/simulateSingleTurn'

describe('Given the "Ledgerman"', () => {
  const role = 'Ledgerman'
  let character: ReturnType<typeof simulateSingleTurn<typeof role>>
  let health: number
  let strength: number

  describe('takes a turn on the Dunshire map', () => {
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

    describe('with a starting health of 10 and strength of 10', () => {
      beforeEach(() => {
        health = 10
        strength = 10
      })

      describe('when the dice rolls are 1 and 1', () => {
        beforeEach(() => {
          takeTurn(1, 1)
        })
        it('never loses health or strength', () => {
          expect(character.health).toBe(10)
          expect(character.strength).toBe(10)
        })
      })

      describe('when the dice rolls are 1 and 2', () => {
        beforeEach(() => {
          takeTurn(1, 2)
        })
        it('never loses health or strength', () => {
          expect(character.health).toBe(10)
          expect(character.strength).toBe(10)
        })
      })

      describe('when the dice rolls are 3 and 3', () => {
        beforeEach(() => {
          takeTurn(3, 3)
        })
        it('never loses health or strength', () => {
          expect(character.health).toBe(10)
          expect(character.strength).toBe(10)
        })
      })

      describe('when the dice rolls are 4 and 4', () => {
        beforeEach(() => {
          takeTurn(4, 4)
        })
        it('never loses health or strength', () => {
          expect(character.health).toBe(10)
          expect(character.strength).toBe(10)
        })
      })

      describe('when the dice rolls are 3 and 4', () => {
        beforeEach(() => {
          takeTurn(3, 4)
        })
        it('never loses health or strength', () => {
          expect(character.health).toBe(10)
          expect(character.strength).toBe(10)
        })
      })
    })
  })

  describe('takes a turn on the Brimward map', () => {
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

    describe('with a starting health of 10 and strength of 10', () => {
      beforeEach(() => {
        health = 10
        strength = 10
      })

      describe('when the dice rolls are 1 and 1 and 1', () => {
        beforeEach(() => {
          takeTurn(1, 1, 1)
        })
        it('never loses health or strength', () => {
          expect(character.health).toBe(10)
          expect(character.strength).toBe(10)
        })
      })

      describe('when the dice rolls are 1 and 2 and 2', () => {
        beforeEach(() => {
          takeTurn(1, 2, 2)
        })
        it('never loses health or strength', () => {
          expect(character.health).toBe(10)
          expect(character.strength).toBe(10)
        })
      })

      describe('when the dice rolls are 3 and 1 and 2', () => {
        beforeEach(() => {
          takeTurn(3, 1, 2)
        })
        it('never loses health or strength', () => {
          expect(character.health).toBe(10)
          expect(character.strength).toBe(10)
        })
      })

      describe('when the dice rolls are 4 and 2 and 2', () => {
        beforeEach(() => {
          takeTurn(4, 2, 2)
        })
        it('never loses health or strength', () => {
          expect(character.health).toBe(10)
          expect(character.strength).toBe(10)
        })
      })

      describe('when the dice rolls are 3 and 2 and 2', () => {
        beforeEach(() => {
          takeTurn(3, 2, 2)
      })
        it('never loses health or strength', () => {
          expect(character.health).toBe(10)
          expect(character.strength).toBe(10)
        })
      })
    })
  })
})
