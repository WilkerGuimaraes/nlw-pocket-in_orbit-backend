import { z } from 'zod'
import { env } from '../env'

const AccessTokenSchema = z.object({
  access_token: z.string(),
})

const GetUserSchema = z.object({
  id: z.number(),
  name: z.string().nullable(),
  email: z.string().nullable(),
  avatar_url: z.string(),
})

export async function getAccessTokenFromCode(code: string) {
  const accessTokenURL = new URL('http://github.com/login/oauth/access_token')

  accessTokenURL.searchParams.set('client_id', env.GITHUB_CLIENT_ID)
  accessTokenURL.searchParams.set('client_secret', env.GITHUB_CLIENT_SECRET)
  accessTokenURL.searchParams.set('code', code)

  const response = await fetch(accessTokenURL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
  })

  const data = await response.json()
  const result = AccessTokenSchema.safeParse(data)

  if (!result.success) {
    throw new Error('Invalid access token response')
  }

  return result.data.access_token
}

export async function getUserFromAccessToken(accessToken: string) {
  const response = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  const data = await response.json()
  const result = GetUserSchema.safeParse(data)

  return result.data
}
