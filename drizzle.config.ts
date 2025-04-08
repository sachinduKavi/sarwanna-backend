import dotenv from 'dotenv'
import { Config } from 'drizzle-kit'


dotenv.config()

export default {
    schema: './src/db/schema.ts',
    out: './src/db/migrations',
    // driver: 'mysql2', // Removed as it is not a valid property
    dialect: 'mysql', // ✅ Add this line
    dbCredentials: {
      url: process.env.DATABASE_URL!,
    },
  } satisfies Config; 