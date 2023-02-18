# CreteSuite take home assessment

This is a take home assessment for the interview process at CreteSuite.

![](https://relevantmagazine.com/wp-content/uploads/2017/06/Screen-Shot-2015-01-16-at-8.57.34-AM.png)

## Overview
This example is based on the Cones of Dunshire, a fictional game from the tv show Parks Recreation.

In this game, each character contains both health and strength - all characters start with 10 strength and 10 health. Each round, characters take turns in order of the highest strength - ties are ignored and previous turn order between those characters is used. A turn consists of a character:
1. rolling two dice - based on the roll, the following actions happen:
    - if all dice are 1s, the character skips its turn without any further action
    - the first character each round gets +2 to its dice roll
    - if the roll is 7 or more, the character gains one health, else the character loses one health
    - if the roll is an even number, the character gains two strength
2. losing 1 strength

After each character takes a turn, the round ends. The player with the greatest sum of health + strength earns 1 cone - if there is a tie, no character receives a cone. The game ends when one character has earned 4 cones. Simple enough.

Of course, it's not that simple.
1) At no point can the value of health or strength drop below 0 or increase above 20.
2) if health reaches 0, that character faints and loses 1/2 of its strength, and its health is reset to 10, and their turn is ended.
3) there are various character roles, some with special behaviors:

#### Villager
The Villager is the generic character. It has no special behaviors.

#### Ledgerman
The Ledgerman never gains or loses health and strength, and is not eligible to receive cones.

#### Maverick
The Maverick is the offensive role and has these unique traits:
1) can gain a maximum of 40 strength
2) gets -2 to its dice roll
3) at the end of its turn, gains 2 strength if health is 5 or less
4) at the end of its turn, gains 1 strength if health is between 6 and 10, inclusive

#### Alchemist
The Alchemist has an additional property, healthPotions
1) it can have a maximum of 3 healthPotions
2) at the end of its turn, it gains 1 healthPotion if its strength is 10 or more
3) if its health reaches 0, it consumes an available healthPotion to restore 5 health, which prevents it from fainting

## Instructions
Since we all have many other priorities in life, please timebox this assignment to no more than a few hours.

We have a new expansion to release for this game. Your objective is to add a new character, the "Farmer” and a new map “Brimward”

#### The Farmer ####
The humble Farmer of course has special behaviors:
1) at the end of its turn, it loses 2 health
2) at the end of its turn, it loses an additional 1 strength
3) whenever its health and strength reaches 0, it activates its special skill called "humility": it immediately earns 1 cone, its health and strength get reset to 12, and ends its turn. Why? Because "it's about the cones"

#### The Brimward Map ####
Either the Dunshire map or Brimward map are used for any one game. The Brimward map has the following special rules:
1) Turn order is determined by total health instead of strength
2) A turn consists of a character:
	1. rolling THREE dice - the same dice rules from above apply
  2. losing 1 health
	3. losing 1 strength

These test cases for this new expansions have already been written for you, just make them green!

Of course, refactoring into well crafted code is required. We are fans of both OOP and FP (ex using [ramdajs](https://ramdajs.com/)), chose your preferred style for this submission.

You may change any interface or implementation, **except**:
1) the signature of the `GameEngine.play` must not change - it must accept only `characters: Array<Character>` and return `Array<Character>` sorted by `cones`, where the first character in the array is the winner.
2) existing tests in `test/cases` must not change, however you may add new ones as needed. Note, you may change `test/support` as needed to support your refactoring.

Once completed, please submit your results via hatchways.io.

## Getting started
Install dependencies

```sh
yarn install
```

## Running the test suite
```sh
yarn test
```
