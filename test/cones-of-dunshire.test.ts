import { Character, ConesOfDunshire } from '../src/cones-of-dunshire';

describe('ConesOfDunshire', () => {
  let character: Character;
  let role: string;
  let health: number;
  let strength: number;

  const takeTurn = () => {
    expect(() => {
      character = Character.create(role, health, strength)
    }).not.toThrowError()
    ConesOfDunshire.takeTurn([character])
  }

  describe('Given the "Generic Character" takes a turn', () => {
    beforeAll(() => {
      role = 'Generic Character'
    })

    describe('when health is between 5 and 10 and strength is between 10 and 20', () => {
      beforeEach(() => {
        health = 8
        strength = 15
        takeTurn()
      })
      it('reduces health by 1', () => {
        expect(character.health).toBe(health - 1)
      })
      it('reduces strength by 1', () => {
        expect(character.strength).toBe(strength - 1)
      })
    })

    describe('when health is between 0 and 5 and strength is between 10 and 20', () => {
      beforeEach(() => {
        health = 3
        strength = 15
        takeTurn()
      })
      it('reduces health by 1', () => {
        expect(character.health).toBe(health - 1)
      })
      it('reduces strength by 1', () => {
        expect(character.strength).toBe(strength - 1)
      })
    })

    describe('when health is between 5 and 10 and strength is between 0 and 10', () => {
      beforeEach(() => {
        health = 7
        strength = 10
        takeTurn()
      })
      it('reduces health by 1', () => {
        expect(character.health).toBe(health - 1)
      })
      it('reduces strength by 1', () => {
        expect(character.strength).toBe(strength - 1)
      })
    })

    describe('when health is between 0 and 5 and strength is between 0 and 10', () => {
      beforeEach(() => {
        health = 3
        strength = 10
        takeTurn()
      })
      it('reduces health by 1', () => {
        expect(character.health).toBe(health - 1)
      })
      it('reduces strength by 1', () => {
        expect(character.strength).toBe(strength - 1)
      })
    })

    describe('when health is 0 and strength is 0', () => {
      beforeEach(() => {
        health = 0
        strength = 0
        takeTurn()
      })
      it('does not reduce health below 0', () => {
        expect(character.health).toBeGreaterThanOrEqual(0)
      })
      it('does not reduce strength below 0', () => {
        expect(character.strength).toBeGreaterThanOrEqual(0)
      })
    })

    describe('when health is 10 and strength is 20', () => {
      beforeEach(() => {
        health = 10
        strength = 20
        takeTurn()
      })
      it('does not increase health above 10', () => {
        expect(character.health).toBeLessThanOrEqual(10)
      })
      it('does not increases strength above 20', () => {
        expect(character.health).toBeLessThanOrEqual(20)
      })
    })
  })

  describe('Given the "Ledgerman" takes a turn', () => {
    beforeAll(() => {
      role = 'Ledgerman'
    })

    describe('when health is between 5 and 10 and strength is between 10 and 20', () => {
      beforeEach(() => {
        health = 8
        strength = 15
        takeTurn()
      })
      it('keeps health the same', () => {
        expect(character.health).toBe(health)
      })
      it('keeps strength the same', () => {
        expect(character.strength).toBe(strength)
      })
    })

    describe('when health is between 0 and 5 and strength is between 10 and 20', () => {
      beforeEach(() => {
        health = 3
        strength = 15
        takeTurn()
      })
      it('keeps health the same', () => {
        expect(character.health).toBe(health)
      })
      it('keeps strength the same', () => {
        expect(character.strength).toBe(strength)
      })
    })

    describe('when health is between 5 and 10 and strength is between 0 and 10', () => {
      beforeEach(() => {
        health = 7
        strength = 10
        takeTurn()
      })
      it('keeps health the same', () => {
        expect(character.health).toBe(health)
      })
      it('keeps strength the same', () => {
        expect(character.strength).toBe(strength)
      })
    })

    describe('when health is between 0 and 5 and strength is between 0 and 10', () => {
      beforeEach(() => {
        health = 3
        strength = 10
        takeTurn()
      })
      it('keeps health the same', () => {
        expect(character.health).toBe(health)
      })
      it('keeps strength the same', () => {
        expect(character.strength).toBe(strength)
      })
    })

    describe('when health is 0 and strength is 0', () => {
      beforeEach(() => {
        health = 0
        strength = 0
        takeTurn()
      })
      it('does not reduce health below 0', () => {
        expect(character.health).toBeGreaterThanOrEqual(0)
      })
      it('does not reduce strength below 0', () => {
        expect(character.strength).toBeGreaterThanOrEqual(0)
      })
    })

    describe('when health is 10 and strength is 20', () => {
      beforeEach(() => {
        health = 10
        strength = 20
        takeTurn()
      })
      it('does not increase health above 10', () => {
        expect(character.health).toBeLessThanOrEqual(10)
      })
      it('does not increases strength above 20', () => {
        expect(character.health).toBeLessThanOrEqual(20)
      })
    })
  })

  describe('Given the "Maverick" takes a turn', () => {
    beforeAll(() => {
      role = 'Maverick'
    })

    describe('when health is between 5 and 10 and strength is between 10 and 20', () => {
      beforeEach(() => {
        health = 8
        strength = 15
        takeTurn()
      })
      it('reduces health by 1', () => {
        expect(character.health).toBe(health - 1)
      })
      it('increases strength by 1', () => {
        expect(character.strength).toBe(strength + 1)
      })
    })

    describe('when health is between 0 and 5 and strength is between 10 and 20', () => {
      beforeEach(() => {
        health = 3
        strength = 15
        takeTurn()
      })
      it('reduces health by 1', () => {
        expect(character.health).toBe(health - 1)
      })
      it('increases strength by 2', () => {
        expect(character.strength).toBe(strength + 2)
      })
    })

    describe('when health is between 5 and 10 and strength is between 0 and 10', () => {
      beforeEach(() => {
        health = 8
        strength = 10
        takeTurn()
      })
      it('reduces health by 1', () => {
        expect(character.health).toBe(health - 1)
      })
      it('increases strength by 1', () => {
        expect(character.strength).toBe(strength + 1)
      })
    })

    describe('when health is between 0 and 5 and strength is between 0 and 10', () => {
      beforeEach(() => {
        health = 3
        strength = 10
        takeTurn()
      })
      it('reduces health by 1', () => {
        expect(character.health).toBe(health - 1)
      })
      it('increases strength by 2', () => {
        expect(character.strength).toBe(strength + 2)
      })
    })

    describe('when health is 0 and strength is 0', () => {
      beforeEach(() => {
        health = 0
        strength = 0
        takeTurn()
      })
      it('does not reduce health below 0', () => {
        expect(character.health).toBeGreaterThanOrEqual(0)
      })
      it('does not reduce strength below 0', () => {
        expect(character.strength).toBeGreaterThanOrEqual(0)
      })
    })

    describe('when health is 10 and strength is 20', () => {
      beforeEach(() => {
        health = 10
        strength = 20
        takeTurn()
      })
      it('does not increase health above 10', () => {
        expect(character.health).toBeLessThanOrEqual(10)
      })
      it('allows increasing strength above 20', () => {
        expect(character.strength).toBeGreaterThan(20)
      })
    })
  })

  describe('Given the "Alchemist" takes a turn', () => {
    beforeAll(() => {
      role = 'Alchemist'
    })

    describe('when health is between 5 and 10 and strength is between 10 and 20', () => {
      beforeEach(() => {
        health = 8
        strength = 15
        takeTurn()
      })
      it('reduces health by 1', () => {
        expect(character.health).toBe(health - 1)
      })
      it('keeps strength the same', () => {
        expect(character.strength).toBe(strength)
      })
      it('sets vialsAvailable to 1/2 of the remaining strength', () => {
        expect(character.vilesAvailable).toBe(Math.ceil(character.strength / 2))
      })
    })

    describe('when health is between 0 and 5 and strength is between 10 and 20', () => {
      beforeEach(() => {
        health = 3
        strength = 15
        takeTurn()
      })
      it('reduces health by 1', () => {
        expect(character.health).toBe(health - 1)
      })
      it('reduces strength to 0', () => {
        expect(character.strength).toBe(0)
      })
      it('sets vialsAvailable to 1/2 of the remaining strength', () => {
        expect(character.vilesAvailable).toBe(Math.ceil(character.strength / 2))
      })
    })

    describe('when health is between 5 and 10 and strength is between 0 and 10', () => {
      beforeEach(() => {
        health = 7
        strength = 10
        takeTurn()
      })
      it('reduces health by 1', () => {
        expect(character.health).toBe(health - 1)
      })
      it('increases strength by 1', () => {
        expect(character.strength).toBe(strength + 1)
      })
      it('sets vialsAvailable to 1/2 of the remaining strength', () => {
        expect(character.vilesAvailable).toBe(Math.ceil(character.strength / 2))
      })
    })

    describe('when health is between 0 and 5 and strength is between 0 and 10', () => {
      beforeEach(() => {
        health = 3
        strength = 10
        takeTurn()
      })
      it('reduces health by 1', () => {
        expect(character.health).toBe(health - 1)
      })
      it('sets strength to 0', () => {
        expect(character.strength).toBe(0)
      })
      it('sets vialsAvailable to 1/2 of the remaining strength', () => {
        expect(character.vilesAvailable).toBe(Math.ceil(character.strength / 2))
      })
    })

    describe('when health is 0 and strength is 0', () => {
      beforeEach(() => {
        health = 0
        strength = 0
        takeTurn()
      })
      it('does not reduce health below 0', () => {
        expect(character.health).toBeGreaterThanOrEqual(0)
      })
      it('does not reduce strength below 0', () => {
        expect(character.strength).toBeGreaterThanOrEqual(0)
      })
      it('sets vialsAvailable to 1/2 of the remaining strength', () => {
        expect(character.vilesAvailable).toBe(Math.ceil(character.strength / 2))
      })
    })

    describe('when health is 10 and strength is 20', () => {
      beforeEach(() => {
        health = 10
        strength = 20
        takeTurn()
      })
      it('does not increase health above 10', () => {
        expect(character.health).toBeLessThanOrEqual(10)
      })
      it('does not increases strength above 20', () => {
        expect(character.strength).toBeLessThanOrEqual(20)
      })
      it('sets vialsAvailable to 1/2 of the remaining strength', () => {
        expect(character.vilesAvailable).toBe(Math.ceil(character.strength / 2))
      })
    })
  })

  describe.skip('Given the "Farmer" takes a turn', () => {
    beforeAll(() => {
      role = 'Farmer'
    })

    describe('when health is between 5 and 10 and strength is between 10 and 20', () => {
      beforeEach(() => {
        health = 8
        strength = 15
        takeTurn()
      })
      it('reduces health by 2', () => {
        expect(character.health).toBe(health - 2)
      })
      it('reduces strength by 1', () => {
        expect(character.strength).toBe(strength - 1)
      })
    })

    describe('when health is between 0 and 5 and strength is between 10 and 20', () => {
      beforeEach(() => {
        health = 3
        strength = 15
        takeTurn()
      })
      it('reduces health by 2', () => {
        expect(character.health).toBe(health - 2)
      })
      it('reduces strength by 2', () => {
        expect(character.strength).toBe(strength - 2)
      })
    })

    describe('when health is between 5 and 10 and strength is between 0 and 10', () => {
      beforeEach(() => {
        health = 8
        strength = 10
        takeTurn()
      })
      it('reduces health by 2', () => {
        expect(character.health).toBe(health - 2)
      })
      it('reduces strength by 1', () => {
        expect(character.strength).toBe(strength - 1)
      })
    })

    describe('when health is between 0 and 5 and strength is between 0 and 10', () => {
      beforeEach(() => {
        health = 3
        strength = 10
        takeTurn()
      })
      it('reduces health by 2', () => {
        expect(character.health).toBe(health - 2)
      })
      it('reduces strength by 2', () => {
        expect(character.strength).toBe(strength - 2)
      })
    })

    describe('when health is at 0', () => {
      beforeEach(() => {
        health = 0
        strength = 5
        takeTurn()
      })
      it('keeps health the same', () => {
        expect(character.health).toBe(0)
      })
      it('sets strength to 20', () => {
        expect(character.strength).toBe(20)
      })
    })

    describe('when health is 0 and strength is 0', () => {
      beforeEach(() => {
        health = 0
        strength = 0
        takeTurn()
      })
      it('does not reduce health below 0', () => {
        expect(character.health).toBeGreaterThanOrEqual(0)
      })
      it('does not reduce strength below 0', () => {
        expect(character.strength).toBeGreaterThanOrEqual(0)
      })
    })

    describe('when health is 10 and strength is 20', () => {
      beforeEach(() => {
        health = 10
        strength = 20
        takeTurn()
      })
      it('does not increase health above 10', () => {
        expect(character.health).toBeLessThanOrEqual(10)
      })
      it('does not increases strength above 20', () => {
        expect(character.strength).toBeLessThanOrEqual(20)
      })
    })
  })
})
