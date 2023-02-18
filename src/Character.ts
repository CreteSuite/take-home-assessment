import { Character as CharacterInterface, CharacterRole } from './types'

export class Character implements CharacterInterface {
  role: CharacterRole
  health: number
  strength: number
  cones: number

  // only applies to alchemist
  healthPotions?: number

  constructor(role: CharacterRole, health: number = 10, strength: number = 10) {
    this.role = role
    this.health = health
    this.strength = strength
    this.cones = 0

    if (this.health > 20) {
      throw new Error('health must not be greater than 20')
    }
    if (this.health < 0) {
      throw new Error('health must not be negative')
    }
    if (this.role === 'Maverick') {
      if (this.strength > 40) {
        throw new Error('strength must not be greater than 40')
      }
    } else if (this.strength > 20) {
      throw new Error('strength must not be greater than 20')
    }
    if (this.strength < 0) {
      throw new Error('strength must not be negative')
    }
  }

  static create(role: CharacterRole, health: number = 10, strength: number = 10) {
    return new Character(role, health, strength)
  }
}
