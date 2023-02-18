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
  }

  static create(role: CharacterRole, health: number = 10, strength: number = 10) {
    return new Character(role, health, strength)
  }
}
