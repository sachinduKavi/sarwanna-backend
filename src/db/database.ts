import { drizzle } from "drizzle-orm/mysql2";
import dotenv from 'dotenv'
import * as schema from './schema'

dotenv.config()

const db = drizzle(process.env.DATABASE_URL!, { schema, mode: 'default' })

export default db