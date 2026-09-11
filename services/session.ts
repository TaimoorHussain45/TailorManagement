import { type SQLiteDatabase } from "expo-sqlite";
export async function createSession(db: SQLiteDatabase) {
  await db.runAsync(
    `INSERT INTO sessions (id, created_at) VALUES (1, datetime('now'))
     ON CONFLICT(id) DO UPDATE SET created_at = excluded.created_at`,
  );
}
export async function hasActiveSession(db: SQLiteDatabase): Promise<boolean> {
  const row = await db.getFirstAsync<{ id: number }>(
    `SELECT id FROM sessions WHERE id = 1`,
  );
  return !!row;
}
export async function clearSession(db: SQLiteDatabase) {
  await db.runAsync(`DELETE FROM sessions WHERE id = 1`);
}
