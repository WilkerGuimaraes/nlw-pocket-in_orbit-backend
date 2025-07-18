import { describe, expect, it } from 'vitest'
import { makeUser } from '../../tests/factories/make-user'
import {
  calculateLevelFromExperience,
  calculateTotalExperienceForLevel,
} from '../modules/gamification'
import { getUserLevelExperience } from './get-user-level-and-experience'

describe('get user level and experience', () => {
  it('should be able to get a user level and experience', async () => {
    const user = await makeUser({
      experience: 200,
    })

    const sut = await getUserLevelExperience({ userId: user.id })

    const level = calculateLevelFromExperience(200)

    expect(sut).toEqual({
      experience: 200,
      level,
      experienceToNextLevel: calculateTotalExperienceForLevel(level),
    })
  })
})
