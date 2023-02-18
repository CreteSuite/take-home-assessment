import { randomInt } from 'crypto'
import { GameEngine } from './types'
import { Character } from './Character'

export class ConesOfDunshire implements GameEngine {
  characters: Array<Character>

  constructor(characters = [] as Array<Character>) {
    this.characters = characters
  }

  play() {
    let hasWinner = false
    while (!hasWinner) {
      this.characters.sort((a, b) => b.strength - a.strength)
      const roundWinner = this._doRound()
      if (roundWinner && roundWinner.role !== 'Ledgerman') {
        roundWinner.cones += 1
      }
      hasWinner = Boolean(this.characters.find((character) => character.cones >= 4))
    }
    return this.characters.slice().sort((a, b) => b.cones - a.cones)
  }

  protected _doRound() {
    for (let i = 0; i < this.characters.length; i++) {
      // 1: rolling two dice
      const [roll1, roll2] = this._rollDice()
      if (this.characters[i].role === 'Ledgerman') {
        continue
      }
      // 1-i: if all dice are 1s, the Character skips its turn without any further action
      if (roll1 === 1 && roll2 === 1) {
        continue
      }
      // 1-ii: the first Character each round gets +2 to its dice roll
      let totalRoll = roll1 + roll2 + (i === 0 ? 2 : 0)
      // The Maveric gets -2 to its dice roll
      if (this.characters[i].role === 'Maverick') {
        totalRoll -= 2
      }
      // 1-iii: if the roll is 7 or more, the Character gains one health, else the Character loses one health
      if (totalRoll >= 7) {
        if (this.characters[i].health < 20) {
          this.characters[i].health += 1
        }
      } else {
        if (this.characters[i].health > 1) {
          this.characters[i].health -= 1
        } else {
          // The Alchemist has an additional property, healthPotions
          if (
            this.characters[i].role === 'Alchemist' &&
            this.characters[i].healthPotions
          ) {
            this.characters[i].healthPotions = (this.characters[i].healthPotions || 0) - 1
            this.characters[i].health = 5
          } else {
            this.characters[i].health = 10
            this.characters[i].strength = Math.ceil(this.characters[i].strength / 2)
            continue
          }
        }
      }
      // 1-iv: if the roll is an even number, the Character gains two strength
      if (totalRoll % 2 === 0) {
        if (this.characters[i].role === 'Maverick') {
          this.characters[i].strength = Math.min(this.characters[i].strength + 2, 40)
        } else {
          this.characters[i].strength = Math.min(this.characters[i].strength + 2, 20)
        }
      }
      // 2: the Character loses 1 strength
      if (this.characters[i].strength > 0) {
        this.characters[i].strength -= 1
      }
      // 3: the Character performs end-of-turn actions (Maverick)
      if (this.characters[i].role === 'Maverick') {
        if (this.characters[i].health <= 5 && this.characters[i].strength < 40) {
          this.characters[i].strength += 1
        }
        if (this.characters[i].health <= 10 && this.characters[i].strength < 40) {
          this.characters[i].strength += 1
        }
      }
      // 3: the Character performs end-of-turn actions (Alchemist)
      if (
        this.characters[i].role === 'Alchemist' &&
        this.characters[i].strength >= 10 &&
        (this.characters[i].healthPotions || 0) < 3
      ) {
        this.characters[i].healthPotions = (this.characters[i].healthPotions || 0) + 1
      }
    }

    const roundResults = this.characters
      .map((character) => ({
        character,
        score: character.health + character.strength
      }))
    const topResult = roundResults.sort((a, b) => b.score - a.score)[0]
    const isTie = topResult.score === roundResults[1]?.score
    const winner = isTie ? null : topResult.character
    return winner
  }

  protected _rollDice() {
    return [
      randomInt(1, 6),
      randomInt(1, 6),
    ]
  }
}
