import { type SQLiteDatabase } from "expo-sqlite";

export const initSchema = async (db: SQLiteDatabase) => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS sessions (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      created_at TEXT NOT NULL
    );
  `);
};
