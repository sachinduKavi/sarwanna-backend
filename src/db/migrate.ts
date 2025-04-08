import dotenv from 'dotenv';
dotenv.config();

import { drizzle } from 'drizzle-orm/mysql2';
import { migrate } from 'drizzle-orm/mysql2/migrator';
import mysql from 'mysql2/promise';

async function runMigrations() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL!);
  const db = drizzle(connection);

  await migrate(db, {
    migrationsFolder: './src/db/migrations', // 🔁 use the path where your .sql files are
  });

  await connection.end(); // ✅ Close MySQL connection
  console.log('Migrations completed successfully!');
}

runMigrations().catch((error) => {
  console.error('Error running migrations:', error);
  process.exit(1);
});
