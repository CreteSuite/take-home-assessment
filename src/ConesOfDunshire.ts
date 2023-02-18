import { randomInt } from 'crypto'
import { GameEngine } from './GameEngine'
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
      if (roundWinner) {
        roundWinner.cones += 1
      }
      hasWinner = Boolean(this.characters.find((character) => character.cones >= 4))
    }
    return this.characters.slice().sort((a, b) => b.cones - a.cones)
  }

  protected _doRound() {
    for (let i = 0; i < this.characters.length; i++) {
      if (this.characters[i].role === 'Ledgerman') {
        continue
      }
      const [roll1, roll2] = [this._rollDice(), this._rollDice()]
      if (roll1 === 1 && roll2 === 1) {
        continue
      }
      let totalRoll = roll1 + roll2 + (i === 0 ? 2 : 0)
      if (this.characters[i].role === 'Maverick') {
        totalRoll -= 2
      }
      if (totalRoll >= 7) {
        if (this.characters[i].health < 20) {
          this.characters[i].health += 1
        }
      } else {
        if (this.characters[i].health > 1) {
          this.characters[i].health -= 1
        } else {
          if (
            this.characters[i].role === 'Alchemist' &&
            this.characters[i].healthPotions
          ) {
            this.characters[i].healthPotions = (this.characters[i].healthPotions || 0) - 1
            this.characters[i].health = 5
          } else if (
            this.characters[i].role === 'Farmer' &&
            this.characters[i].strength === 0
          ) {
            this.characters[i].health = 12
            this.characters[i].strength = 12
            this.characters[i].cones = (this.characters[i].cones || 0) + 1
            continue
          } else {
            this.characters[i].health = 10
            this.characters[i].strength = Math.ceil(this.characters[i].strength / 2)
            continue
          }
        }
      }
      if (totalRoll % 2 === 0) {
        if (this.characters[i].role === 'Maverick') {
          this.characters[i].strength = Math.min(this.characters[i].strength + 2, 40)
        } else {
          this.characters[i].strength = Math.min(this.characters[i].strength + 2, 20)
        }
      }
      if (this.characters[i].strength > 0) {
        this.characters[i].strength -= 1
      }
      if (this.characters[i].role === 'Maverick') {
        if (this.characters[i].health <= 5 && this.characters[i].strength < 40) {
          this.characters[i].strength += 1
        }
        if (this.characters[i].health <= 10 && this.characters[i].strength < 40) {
          this.characters[i].strength += 1
        }
      }
      if (
        this.characters[i].role === 'Alchemist' &&
        this.characters[i].strength >= 10 &&
        (this.characters[i].healthPotions || 0) < 3
      ) {
        this.characters[i].healthPotions = (this.characters[i].healthPotions || 0) + 1
      }
      if (this.characters[i].role === 'Farmer') {
        if (this.characters[i].strength > 0) {
          this.characters[i].strength -= 1
        }
        this.characters[i].health = Math.max(0, this.characters[i].health - 2)
        if (
          this.characters[i].health === 0 &&
          this.characters[i].strength === 0
        ) {
          this.characters[i].health = 12
          this.characters[i].strength = 12
          this.characters[i].cones = (this.characters[i].cones || 0) + 1
          continue
        }
        if (this.characters[i].health === 0) {
          this.characters[i].health = 10
          this.characters[i].strength = Math.ceil(this.characters[i].strength / 2)
          continue
        }
      }
    }

    const roundResults = this.characters
      .filter((character) => character.role !== 'Ledgerman')
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
    return randomInt(1, 6)
  }
}
