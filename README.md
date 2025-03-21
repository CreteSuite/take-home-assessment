# CreteSuite take home assessment
This is a take home assessment for the interview process at CreteSuite. Our desire is for you to showcase your ability to iterate a new feature and improve quality while doing so. **Make the change easy, then make the easy change.**

![](https://relevantmagazine.com/wp-content/uploads/2017/06/Screen-Shot-2015-01-16-at-8.57.34-AM.png)

## Overview
This example is based on the Cones of Dunshire, a fictional game from the tv show Parks Recreation.

In this game, each Character contains both health and strength - all Characters start with 10 strength and 10 health. Each round, Characters take turns in order of the highest strength - ties are ignored and the previous turn order between those Characters is used. A turn consists of:
1) rolling two dice - based on the roll, the following actions happen:
    1) if all dice are 1s, the Character skips its turn without any further action
    2) the first Character each round gets +2 to its dice roll
    3) if the roll is 7 or more, the Character gains one health, else the Character loses one health
    4) if the roll is an even number, the Character gains two strength
2) the Character loses 1 strength
3) the Character performs any end-of-turn actions (see below)

After each Character takes a turn, the round ends. The Character with the greatest sum of health + strength earns 1 cone - if there is a tie, no Character receives a cone. The game ends when one Character has earned 4 cones. Simple enough.

Of course, it's not that simple.
- at no point can the value of health or strength drop below 0 or increase above 20
- if health reaches 0, that Character faints and loses 1/2 of its strength (rounded up), and its health is reset to 10, and their turn is ended
- there are various Character roles, some with special behaviors

#### Villager
The Villager is the generic Character. It has no special behaviors.

#### Ledgerman
The Ledgerman never gains or loses health and strength, and is not eligible to receive cones. The Ledgerman is still an active player, and proceeds through a turn normally.

#### Maverick
The Maverick is the offensive role and has these unique traits:
- it can gain a maximum of 40 strength
- gets -2 to its dice roll
- at the end of its turn, gains 2 strength if health is 5 or less
- at the end of its turn, gains 1 strength if health is between 6 and 10, inclusive

#### Alchemist
The Alchemist has an additional property, healthPotions
- it can have a maximum of 3 healthPotions
- at the end of its turn, it gains 1 healthPotion if its strength is 10 or more
- if its health reaches 0, it consumes an available healthPotion to restore 5 health, which prevents it from fainting

## Instructions
Since we all have many other priorities in life, please timebox this assignment to no more than a few hours.

We have a new expansion to release for this game. Your objective is to add a new map “Brimward”

#### The Brimward Map
Either the Dunshire map or Brimward map are used for any one game. The Brimward map has the following special rules:
- turn order is determined by total health instead of strength
- a turn consists of:
    1) rolling THREE dice - the same 4 dice rules from the Dunshire map apply
    2) the Character loses 1 health
    2) the Character loses 1 strength
    4) the Character performs any end-of-turn actions (see above)

Of course, refactoring into well crafted code is required. Make the change easy, then make the easy change. We are fans of both OOP and FP (ex using [ramdajs](https://ramdajs.com/)), chose your preferred style for this submission. The test cases for this new expansion have already been written in order to support in your refactoring and implementation of the new map.

You may change any interface or implementation, **except**:
- The signature of the `GameEngine.play` must not change - it must receive no arguments and return `Array<Character>` sorted by `cones` descending, where the first Character in the array is the winner. You may move this implementation to any class you'd like.
- Existing tests in `test/cases` must not change, however you may add new ones if you desire to. Note, you will need to change files in `test/support` to support your refactoring and the expansion.

Please submit your solution via hatchways.io. In your PR, please provide a description detailing your approach in implementing this feature.

## Getting started
Install dependencies

```sh
yarn install
```

### Running the test suite
```sh
yarn test
```

#### Run just Dunshire map tests (should be all green when starting)
```sh
yarn test:dunshire
```

#### Run just Brimward map tests (should be all red when starting)
```sh
yarn test:brimward
```
