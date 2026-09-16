import { type SQLiteDatabase } from "expo-sqlite";

export const initSchema = async (db: SQLiteDatabase) => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS sessions (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      created_at TEXT NOT NULL
    );
     CREATE TABLE IF NOT EXISTS Customer (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      address TEXT,
      notes TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS Measurement (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER NOT NULL,
    shirt_length REAL NOT NULL,
  chest REAL NOT NULL,
  shoulder REAL NOT NULL,
  sleeve REAL NOT NULL,
  collar REAL NOT NULL,
  ghera REAL NOT NULL,
    shalwar_length REAL NOT NULL,
  paoncha_width REAL NOT NULL,
    collar_style TEXT NOT NULL,
  cuff_style TEXT NOT NULL,
  pocket_config TEXT NOT NULL,
  bottom_type TEXT NOT NULL,
  waist_attachment TEXT NOT NULL,
   created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES Customer(id) ON DELETE CASCADE
    );
    CREATE TABLE IF NOT EXISTS "Order" (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER NOT NULL,
    measurement_id INTEGER,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('In Progress', 'Pending', 'Completed', 'Delayed')),
    due_date TEXT,
    quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity >= 1),
    progress INTEGER NOT NULL DEFAULT 0
    CHECK(progress>=0 AND progress<=100),
     created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (customer_id) REFERENCES Customer(id) ON DELETE CASCADE,
      FOREIGN KEY (measurement_id) REFERENCES Measurement(id) ON DELETE SET NULL
    );
    
  `);
};
