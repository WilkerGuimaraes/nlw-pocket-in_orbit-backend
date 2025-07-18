import { expect, test } from 'vitest'
import {
  calculateExperienceToLevel,
  calculateLevelFromExperience,
  calculateTotalExperienceForLevel,
} from './gamification'

test('experience to level', () => {
  const experienceToLevel1 = calculateExperienceToLevel(1)
  const experienceToLevel2 = calculateExperienceToLevel(2)
  const experienceToLevel5 = calculateExperienceToLevel(4)

  expect(experienceToLevel1).toEqual(0)
  expect(experienceToLevel2).toEqual(26)
  expect(experienceToLevel5).toEqual(43)
})

test('total experience to level', () => {
  const experienceToLevel1 = calculateTotalExperienceForLevel(1)
  const experienceToLevel2 = calculateTotalExperienceForLevel(2)
  const experienceToLevel3 = calculateTotalExperienceForLevel(3)
  const experienceToLevel4 = calculateTotalExperienceForLevel(4)

  expect(experienceToLevel1).toEqual(0)
  expect(experienceToLevel2).toEqual(26)
  expect(experienceToLevel3).toEqual(26 + 33)
  expect(experienceToLevel4).toEqual(26 + 33 + 43)
})

test('level from experience', () => {
  const level1 = calculateLevelFromExperience(10)
  const level2 = calculateLevelFromExperience(26)
  const level5 = calculateLevelFromExperience(43 + 33 + 26)

  expect(level1).toEqual(1)
  expect(level2).toEqual(2)
  expect(level5).toEqual(4)
})
