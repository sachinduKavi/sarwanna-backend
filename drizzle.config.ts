import dotenv from 'dotenv'
import { defineConfig } from 'drizzle-kit'


dotenv.config()

export default defineConfig({
    schema: './src/db/schema.ts',
    out: './src/db/migrations',
    driver: 'd1-http',
    dbCredentials: {
        connectionString: process.env.DATABASE_URL as string,
    },
    verbose: true,
    strict: true
})