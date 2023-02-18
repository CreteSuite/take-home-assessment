export class Character {
  role: string;
  health: number;
  strength: number;

  // only applies to alchemist
  vilesAvailable?: number;

  constructor(role: string, health: number, strength: number) {
    this.role = role;
    this.health = health;
    this.strength = strength;

    if (this.health > 10) {
      throw new Error('health must not be greater than 10')
    }
    if (this.health < 0) {
      throw new Error('health must not be negative')
    }
    if (this.strength > 20) {
      throw new Error('strength must not be greater than 20')
    }
    if (this.strength < 0) {
      throw new Error('strength must not be negative')
    }
  }

  static create(role: string, health: number, strength: number) {
    return new Character(role, health, strength)
  }
}

export class ConesOfDunshire {
  characters: Array<Character>;

  constructor(characters = [] as Array<Character>) {
    this.characters = characters;
  }

  static takeTurn(characters = [] as Array<Character>) {
    return new ConesOfDunshire(characters).takeTurn()
  }

  takeTurn() {
    for (let i = 0; i < this.characters.length; i++) {
      if (this.characters[i].role != 'Maverick') {
        if (this.characters[i].role != 'Alchemist') {
          if (this.characters[i].strength > 0) {
            if (this.characters[i].role != 'Ledgerman') {
              this.characters[i].strength = this.characters[i].strength - 1
            }
          }
        } else {
          if (this.characters[i].strength < 11) {
            this.characters[i].strength = this.characters[i].strength + 1
          }
        }
      } else {
        if (this.characters[i].strength < 40) {
          if (this.characters[i].health < 6) {
            this.characters[i].strength = this.characters[i].strength + 1
          }
          if (this.characters[i].health < 11) {
            this.characters[i].strength = this.characters[i].strength + 1
          }
        }
      }
      if (this.characters[i].role != 'Ledgerman') {
        if (this.characters[i].health > 0) {
          this.characters[i].health = this.characters[i].health - 1;
        }
      }
      if (this.characters[i].role == 'Alchemist') {
        if (this.characters[i].strength < 20) {
          if (this.characters[i].health < 6) {
            this.characters[i].strength = this.characters[i].strength - this.characters[i].strength
          }
        }
      }
      if (this.characters[i].role === 'Alchemist') {
        this.characters[i].vilesAvailable = Math.ceil(this.characters[i].strength / 2)
      }
    }
    return this.characters;
  }
}
