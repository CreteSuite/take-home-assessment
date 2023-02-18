# CreteSuite take home assessment

This is a take home assessment for the interview process at CreteSuite.

![](https://relevantmagazine.com/wp-content/uploads/2017/06/Screen-Shot-2015-01-16-at-8.57.34-AM.png)

## Overview
This example is based on the Cones of Dunshire, a fictional game from the tv show Parks Recreation.

In this game, a character contains both health and strength. Each time they take a turn, they lose 1 health and 1 strength. Simple enough.

Of course, it's not that simple.
1) health and strength can't drop below 0 and strength can't increase above 20.
2) some characters have special behaviors:

#### Ledgerman
The Ledgerman is just the score keeper and never gains or loses health and strength.

#### Maverick
The Maverick is the offensive role and has these unique traits:
1) can gain a maximum of 40 strength
2) gains 2 strength if health is 5 or less
3) gains 1 strength if health is between 6 and 10

#### Alchemist
The Alchemist is very bespoke:
1) if strength is less than 10, they gain 1 strength
2) if the Alchemist ends the turn with 5 health or less, they lose all their strength
3) the Alchemist has an additional property, vilesAvailable, which is equal to 1/2 their end of turn strength (rounded up).

## Instructions
Since we all have many other priorities in life, please timebox this assignment to no more than a few hours.

Your objective is to add a new character, the "Farmer".

The Farmer of course has special behaviors:
1) loses 2 health each turn
2) loses 1 strength each turn
3) loses an additional strength if health is at or below 5
4) when health reaches 0, strength gets set to 20. Why? Because "it's about the cones"

These test cases have already been written for you on [lines 394-496](test/cones-of-dunshire.test.ts#L394-L496). Please remove the `skip` on [lines 394](test/cones-of-dunshire.test.ts#L394) and make them green!

Of course, refactoring [`cones-of-dunshire.ts`](src/cones-of-dunshire.ts) is suggested. We are fans of both object oriented and functional styles of programming, take your pick!

Once completed, please create a **private** GitHub repo and invite [brandonwestcott](https://github.com/brandonwestcott) as a contributor.

## Getting started
Install dependencies

```sh
yarn install
```

## Running the test suite
```sh
yarn run test
```
