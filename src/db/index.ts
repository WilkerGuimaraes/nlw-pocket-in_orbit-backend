import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { env } from '../env'
import * as schema from './schema'

export const client = postgres(env.DATABASE_URL)
export const db = drizzle(client, {
  schema,
  logger: env.NODE_ENV === 'development',
})
